import multer from "multer";
import fs from "fs";
import path from "path";

// Defina o diretório de armazenamento
const TMP_DIR = "tmp/";

// Verifique se o diretório existe e crie se necessário
if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

// Configure o storage do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TMP_DIR); // Use o diretório definido
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
