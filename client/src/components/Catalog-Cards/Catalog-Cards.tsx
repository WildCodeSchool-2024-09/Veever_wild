import { system } from "@chakra-ui/react/preset";
import "./Catalog-Cards.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import type { CatalogueProps } from "../catalog-swipper/catalogSwipper";

import ChrMiddleCard from "./Chr-Middle-Card";
import ChrTopCard from "./Chr-Top-Card";

export default function CatalogCards({ saveCards }: CatalogueProps) {
  return (
    <>
      <ChrTopCard />
      <article className="chr-full-card">
        <ChakraProvider value={system}>
          <Box
            className="chrCard"
            maxW="sm"
            borderWidth="1px"
            overflow="hidden"
          >
            <ChrMiddleCard saveCards={saveCards} />
          </Box>
        </ChakraProvider>
      </article>
    </>
  );
}
