import { I18n } from "i18n-js";
import en from "./translations/en";
import es from "./translations/es";
import pt from "./translations/pt";
import gl from "./translations/gl";
import ca from "./translations/ca";

export const i18n = new I18n({ en, es, pt, gl, ca });

i18n.enableFallback = true;
