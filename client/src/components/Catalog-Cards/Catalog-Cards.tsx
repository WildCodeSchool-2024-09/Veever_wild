import { system } from "@chakra-ui/react/preset";
import "./Catalog-Cards.css";
import { ChakraProvider } from "@chakra-ui/react";

import type { Card } from "../../types/Catalog/CatalogTypes";
import ChrMiddleCard from "./Chr-Middle-Card";
import ChrTopCard from "./Chr-Top-Card";

export type CatalogueProps = {
  saveCards: Card[];
};

export default function CatalogCards({ saveCards }: CatalogueProps) {
  return (
    <>
      <ChrTopCard />
      <article className="chr-full-card">
        <ChakraProvider value={system}>
          <ChrMiddleCard saveCards={saveCards} />
        </ChakraProvider>
      </article>
    </>
  );
}
