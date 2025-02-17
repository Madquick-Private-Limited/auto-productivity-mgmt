import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../uploads/");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    console.log("File mimetype:", file.mimetype);
    if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
        cb(null, true);
    } else {
        console.error("Rejected file type:", file.mimetype);
        cb(
            new Error("Invalid file type! Only Excel files are allowed."),
            false
        );
    }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
