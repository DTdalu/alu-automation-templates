#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

// Get the templates root (parent of mcp-server)
const TEMPLATES_ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")),
  "../.."
);

interface Placeholder {
  key: string;
  description: string;
  required: boolean;
  default?: string;
  example: string;
}

interface Skill {
  id: string;
  name: string;
  description: string;
  version: string;
  category: string;
  scope: "project" | "user";
  path: string;
  entryPoint: string;
  placeholders: Placeholder[];
  references: string[];
  dependencies: string[];
  keywords: string[];
}

interface Manifest {
  name: string;
  description: string;
  version: string;
  skills: Skill[];
  installation: {
    targetPaths: {
      project: string;
      user: string;
    };
    fileRenaming: Record<string, string>;
  };
}

function loadManifest(): Manifest {
  const manifestPath = path.join(TEMPLATES_ROOT, "manifest.json");
  const content = fs.readFileSync(manifestPath, "utf-8");
  return JSON.parse(content);
}

function expandPath(p: string): string {
  if (p.startsWith("~/")) {
    return path.join(os.homedir(), p.slice(2));
  }
  return p;
}

function replacePlaceholders(
  content: string,
  values: Record<string, string>
): string {
  let result = content;
  for (const [key, value] of Object.entries(values)) {
    const pattern = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    result = result.replace(pattern, value);
  }
  return result;
}

function renameFile(filename: string, renaming: Record<string, string>): string {
  let result = filename;
  for (const [from, to] of Object.entries(renaming)) {
    if (result.endsWith(from)) {
      result = result.slice(0, -from.length) + to;
    }
  }
  return result;
}

// Define available tools
const tools: Tool[] = [
  {
    name: "list_skills",
    description:
      "List all available skills from the alu-automation-templates repository with their descriptions, placeholders, and installation requirements.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Filter by category (e.g., 'project-management')",
        },
        scope: {
          type: "string",
          enum: ["project", "user"],
          description: "Filter by scope (project or user)",
        },
      },
    },
  },
  {
    name: "install_skill",
    description:
      "Install a skill from alu-automation-templates to a target project or user scope. Handles placeholder replacement and file copying.",
    inputSchema: {
      type: "object",
      properties: {
        skill_id: {
          type: "string",
          description: "The skill ID to install (e.g., 'scrum-master', 'session-log')",
        },
        target_path: {
          type: "string",
          description:
            "Target project path for installation. Use '~' for user scope. If omitted, uses current working directory for project scope or user home for user-scoped skills.",
        },
        placeholders: {
          type: "object",
          additionalProperties: { type: "string" },
          description:
            "Key-value pairs for placeholder replacement (e.g., {\"CLOUD_ID\": \"abc-123\", \"PROJECT_KEY\": \"PE\"})",
        },
        dry_run: {
          type: "boolean",
          description: "If true, shows what would be done without making changes",
        },
      },
      required: ["skill_id"],
    },
  },
  {
    name: "get_skill_details",
    description:
      "Get detailed information about a specific skill including all placeholders and their descriptions.",
    inputSchema: {
      type: "object",
      properties: {
        skill_id: {
          type: "string",
          description: "The skill ID to get details for",
        },
      },
      required: ["skill_id"],
    },
  },
];

// Tool handlers
async function handleListSkills(args: {
  category?: string;
  scope?: "project" | "user";
}): Promise<string> {
  const manifest = loadManifest();
  let skills = manifest.skills;

  if (args.category) {
    skills = skills.filter((s) => s.category === args.category);
  }
  if (args.scope) {
    skills = skills.filter((s) => s.scope === args.scope);
  }

  const result = skills.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    scope: s.scope,
    category: s.category,
    requiredPlaceholders: s.placeholders
      .filter((p) => p.required)
      .map((p) => p.key),
    optionalPlaceholders: s.placeholders
      .filter((p) => !p.required)
      .map((p) => p.key),
  }));

  return JSON.stringify(
    {
      total: result.length,
      skills: result,
    },
    null,
    2
  );
}

async function handleGetSkillDetails(args: { skill_id: string }): Promise<string> {
  const manifest = loadManifest();
  const skill = manifest.skills.find((s) => s.id === args.skill_id);

  if (!skill) {
    return JSON.stringify({
      error: `Skill '${args.skill_id}' not found`,
      available: manifest.skills.map((s) => s.id),
    });
  }

  return JSON.stringify(
    {
      ...skill,
      templatePath: path.join(TEMPLATES_ROOT, skill.path),
      installationTarget:
        skill.scope === "project"
          ? manifest.installation.targetPaths.project
          : manifest.installation.targetPaths.user,
    },
    null,
    2
  );
}

async function handleInstallSkill(args: {
  skill_id: string;
  target_path?: string;
  placeholders?: Record<string, string>;
  dry_run?: boolean;
}): Promise<string> {
  const manifest = loadManifest();
  const skill = manifest.skills.find((s) => s.id === args.skill_id);

  if (!skill) {
    return JSON.stringify({
      error: `Skill '${args.skill_id}' not found`,
      available: manifest.skills.map((s) => s.id),
    });
  }

  // Validate required placeholders
  const providedPlaceholders = args.placeholders || {};
  const missingRequired = skill.placeholders
    .filter((p) => p.required && !providedPlaceholders[p.key])
    .map((p) => ({ key: p.key, description: p.description, example: p.example }));

  if (missingRequired.length > 0) {
    return JSON.stringify({
      error: "Missing required placeholders",
      missing: missingRequired,
      provided: Object.keys(providedPlaceholders),
    });
  }

  // Build complete placeholder values with defaults
  const placeholderValues: Record<string, string> = {};
  for (const p of skill.placeholders) {
    if (providedPlaceholders[p.key]) {
      placeholderValues[p.key] = providedPlaceholders[p.key];
    } else if (p.default !== undefined) {
      placeholderValues[p.key] = p.default;
    }
  }

  // Determine target directory
  let targetBase: string;
  if (args.target_path) {
    targetBase = expandPath(args.target_path);
  } else if (skill.scope === "user") {
    targetBase = expandPath(manifest.installation.targetPaths.user);
  } else {
    targetBase = path.join(process.cwd(), manifest.installation.targetPaths.project);
  }

  const targetDir = path.join(targetBase, skill.id);
  const sourceDir = path.join(TEMPLATES_ROOT, skill.path);

  // Collect files to process
  const filesToProcess: Array<{
    source: string;
    target: string;
    relativePath: string;
  }> = [];

  function collectFiles(dir: string, relativeBase: string = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const sourcePath = path.join(dir, entry.name);
      const relativePath = path.join(relativeBase, entry.name);

      if (entry.isDirectory()) {
        collectFiles(sourcePath, relativePath);
      } else {
        const targetName = renameFile(entry.name, manifest.installation.fileRenaming);
        const targetRelative = path.join(relativeBase, targetName);
        filesToProcess.push({
          source: sourcePath,
          target: path.join(targetDir, targetRelative),
          relativePath: targetRelative,
        });
      }
    }
  }

  collectFiles(sourceDir);

  if (args.dry_run) {
    return JSON.stringify(
      {
        dryRun: true,
        skill: skill.id,
        targetDirectory: targetDir,
        placeholders: placeholderValues,
        files: filesToProcess.map((f) => ({
          from: f.source,
          to: f.target,
        })),
      },
      null,
      2
    );
  }

  // Perform installation
  const results: Array<{ file: string; status: string }> = [];

  for (const file of filesToProcess) {
    try {
      // Ensure target directory exists
      const targetDirPath = path.dirname(file.target);
      fs.mkdirSync(targetDirPath, { recursive: true });

      // Read, transform, and write
      let content = fs.readFileSync(file.source, "utf-8");

      // Only replace placeholders in .md and .template.md files
      if (file.source.endsWith(".md")) {
        content = replacePlaceholders(content, placeholderValues);
      }

      fs.writeFileSync(file.target, content, "utf-8");
      results.push({ file: file.relativePath, status: "created" });
    } catch (err) {
      results.push({
        file: file.relativePath,
        status: `error: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  }

  return JSON.stringify(
    {
      success: true,
      skill: skill.id,
      targetDirectory: targetDir,
      placeholders: placeholderValues,
      files: results,
    },
    null,
    2
  );
}

// Create and run server
const server = new Server(
  {
    name: "alu-skill-installer",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tool list handler
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

// Register tool call handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: string;

    switch (name) {
      case "list_skills":
        result = await handleListSkills(args as { category?: string; scope?: "project" | "user" });
        break;
      case "get_skill_details":
        result = await handleGetSkillDetails(args as { skill_id: string });
        break;
      case "install_skill":
        result = await handleInstallSkill(
          args as {
            skill_id: string;
            target_path?: string;
            placeholders?: Record<string, string>;
            dry_run?: boolean;
          }
        );
        break;
      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }

    return {
      content: [{ type: "text", text: result }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ALU Skill Installer MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
