import del from "del";
import { path } from "../config/path.js";

// Удаление директорий
const clear = () => {
    return del(path.root);
};

export { clear };
