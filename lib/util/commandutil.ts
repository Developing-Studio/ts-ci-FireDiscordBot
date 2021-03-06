import {
  CommandUtil as AkairoUtil,
  ParsedComponentData as AkairoParsed,
} from "discord-akairo";
import { Language } from "./language";
import { Command } from "./command";
import { Fire } from "@fire/lib/Fire";

export class CommandUtil extends AkairoUtil {
  parsed?: ParsedComponentData;
}

export interface ParsedComponentData extends AkairoParsed {
  command: Command;
}

interface Category {
  id: number;
  name: string;
  commands: {
    name: string;
    description: string;
    usage: string;
    aliases: string;
  }[];
}

interface ResponseCommand {
  name: string;
  description: string;
  usage: string;
  aliases: string;
  category: string;
}

export const getCommands = (client: Fire) => {
  const categories: Category[] = [];
  let categoryID = 0;

  client.commandHandler.categories
    .filter(
      (category) =>
        !!category.findKey(
          (command) =>
            command.category.id != "Admin" &&
            !command.hidden &&
            !command.ownerOnly
        )
    )
    .forEach((commandsCategory) => {
      const category: Category = {
        id: categoryID++,
        name: commandsCategory.id,
        commands: [],
      };

      category.commands = commandsCategory
        .filter(
          (command: Command) =>
            !command.ownerOnly &&
            command.category.id != "Admin" &&
            !command.hidden
        )
        .map((command) => {
          const args = command.getArgumentsClean().join(" ");
          return {
            name: command.id,
            description: command.description(
              client.languages.modules.get("en-US") as Language
            ),
            usage: `{prefix}${command.id} ${args}`.trim(),
            aliases: command.aliases
              .filter((alias) => alias != command.id)
              .join(", "),
          };
        });

      if (category.commands.length > 0) {
        categories.push(category);
      }
    });

  return categories;
};

export const getAllCommands = (client: Fire) => {
  const commands = client.commandHandler.modules
    .filter(
      (command: Command) =>
        !command.ownerOnly && command.category.id != "Admin" && !command.hidden
    )
    .map((command: Command) => {
      const args = command.getArgumentsClean().join(" ");
      return {
        name: command.id,
        description: command.description(
          client.languages.modules.get("en-US") as Language
        ),
        usage: `{prefix}${command.id} ${args}`.trim(),
        aliases: command.aliases
          .filter((alias) => alias != command.id)
          .join(", "),
        category: command.category.toString(),
      } as ResponseCommand;
    });

  return commands;
};
