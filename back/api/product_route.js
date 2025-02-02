import express from 'express'

import { Product } from '../models.js'
import { token, isAdmin }  from '../auth.js'

const productRoute =  express.Router();


//create a new product

/**
 * @swagger
 * /api/create_product:
 *   post:
 *     summary: Create a product
 *     description: create product according to schema
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       403:
 *         description: Forbidden (Access is only available to admin users)
 *     security:
 *       - BearerAuth: []
 *     x-role: admin
 */

productRoute.post("/create_product", token, isAdmin, async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
      console.log(product)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


// get all products
/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *     security:
 *       - BearerAuth: []
 */

productRoute.get("/products", token, async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
  });

// get a specific product
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     description: Get a specific product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request (invalid ID format)
 *     security:
 *       - BearerAuth: []
 */


productRoute.get("/products/:id", token, async (req, res) => {
    const product = await Product.findOne({where: {id: req.params.id}})
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  });



// update a specific product
/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     description: Update a specific product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Successfully updated the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request (invalid data or format)
 *       404:
 *         description: Product not found
 *     security:
 *       - BearerAuth: []
 */


productRoute.patch("/products/:id",  async (req, res) => {
    const product = await Product.findOne({where: {id: req.params.id}});
   
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (product)
   { await product.update(req.body);
    res.json(product);}
  });


// delete a specific product
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     description: Delete a specific product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request (invalid ID format)
 *     security:
 *       - BearerAuth: []
 */


productRoute.delete("/products/:id", token, isAdmin, async (req, res) => {
    const product = await Product.findOne({where: {id: req.params.id}});
    if (!product) return res.status(404).json({ error: "Product not found" });
    if(product) {
      await product.destroy();
      res.json({ message: "Product deleted successfully" });
    }
  });

export default productRoute