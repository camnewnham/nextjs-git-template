import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";
import { Root } from "hast";
import { VFile } from "vfile";

export type TocElement = {
  id: string;
  rank: number;
  title: string;
};

export default function rehypeToc() {
  return function (tree: Root, file: VFile) {
    const result: TocElement[] = [];

    visit(tree, "element", function (node) {
      const rank = headingRank(node);
      if (rank && node.properties.id) {
        result.push({
          id: node.properties.id as string,
          rank,
          title: toString(node),
        });
      }
    });

    file.data.headings = result;
  };
}
