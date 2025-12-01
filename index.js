import express from "express";
import bodyParser from "body-parser";
import { createApp } from "./app.js";

const app = createApp(express, bodyParser, import.meta.url);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
