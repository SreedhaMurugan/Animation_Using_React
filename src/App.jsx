import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, CircularProgress, Container, Grid, Card, CardMedia, CardContent, Box, Modal, Button } from "@mui/material";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import AppHeader from "./AppBar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* MUI Header */}
      <AppHeader />
      <Container maxWidth={false} sx={{ mt: "7rem" }}>

        {/* Product List */}
        {!loading && !error && (
          <Grid container spacing={3} justifyContent="center" marginBottom="2rem">
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id} display="flex" justifyContent="center" >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                    transition: { type: "spring", stiffness: 200 },
                  }}
                  onClick={() => setSelectedProduct(product)}
                  style={{ cursor: "pointer" }}
                >
                  <Card sx={{ height: 550, maxWidth: 400, display: "flex", flexDirection: "column", backgroundColor: "#ffe0b2" }}>
                    <CardMedia component="img" image={product.image} alt={product.title} sx={{ height: 170, objectFit: "contain", backgroundColor: "#fff" }} />
                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold", textAlign: "center" }}>
                        {product.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: "3rem" }}>
                        {product.description.length > 200 ? product.description.substring(0, 200) + "..." : product.description}
                      </Typography>

                      {/* Price & Rating Section */}
                      <Box>
                        <Box display="flex" alignItems="baseline" sx={{ mt: "1rem" }}>
                          <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold", color: "#000" }}>
                            ₹{product.price}
                          </Typography>
                          <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold", color: "#000", alignSelf: "flex-start" }}>00</Typography>
                        </Box>

                        {/* Rating Section */}
                        <Box display="flex" alignItems="center" mt={1}>
                          {Array.from({ length: 5 }).map((_, index) => {
                            const starRating = product.rating?.rate || 3;
                            if (index + 1 <= starRating) {
                              return <Star key={index} sx={{ color: "orange" }} />;
                            } else if (index < starRating && index + 0.5 <= starRating) {
                              return <StarHalf key={index} sx={{ color: "orange" }} />;
                            } else {
                              return <StarBorder key={index} sx={{ color: "orange" }} />;
                            }
                          })}
                          <Typography sx={{ fontSize: "1rem", ml: 1 }}>({product.rating?.count || 100} reviews)</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Animated Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <Modal open={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
              exit={{ y: -50, opacity: 0 }}
              style={{
                position: "absolute",
                top: "20%",
                left: "40%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                width: "400px",
              }}
            >
              {/* <Box> */}
                <Typography variant="h5" gutterBottom sx={{color:'black',textAlign:'center'}}>
                  {selectedProduct.title}
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
  <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: "30%", borderRadius: "5px"}} />
</Box>                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                  {selectedProduct.description}
                </Typography>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={() => setSelectedProduct(null)}>
                  Close
                </Button>
              {/* </Box> */}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductList;
