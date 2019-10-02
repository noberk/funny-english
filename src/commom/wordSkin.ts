import { wordPropertyType } from "../data/ES4K/essential_2";

export function getWordPropertyCssName(type: wordPropertyType){
    switch (type) {
      case "adj": return "e_adj";
      case "verb": return "e_adj";
      case "noun": return "e_noun";
      case "adv": return "e_adv";
      case "pron": return "e_pron";
      case "conj": return "e_conj";
      case "art": return "e_art";
      case "prep": return "e_adj";
    }
}