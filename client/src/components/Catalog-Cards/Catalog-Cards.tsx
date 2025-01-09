import { system } from "@chakra-ui/react/preset";
import "./Catalog-Cards.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import ChrBottomCard from "./Chr-Bottom-Card";
import ChrMiddleCard from "./Chr-Middle-Card";
import ChrTopCard from "./Chr-Top-Card";

export default function CatalogCards() {
  return (
    <div className="chr-full-card">
      <ChrTopCard />
      <ChakraProvider value={system}>
        <Box className="chrCard" maxW="sm" borderWidth="1px" overflow="hidden">
          <ChrMiddleCard />
          <Box className="chrCard" p="6">
            <Box className="bottomCard" mt="4" display="flex" gap="4">
              <ChrBottomCard />
            </Box>
          </Box>
        </Box>
      </ChakraProvider>
    </div>
  );
}
