type Country = "cn"|"en"
abstract class Multilingualism {
  abstract ITLES: { title: string; intro: string };
}
class CN implements Multilingualism {
  ITLES = { title: "1", intro: "w" };
}
class EN implements Multilingualism {
  ITLES = {
    title: "🎊The key Essential words that you have to know🎊",
    intro:
      "IELTS academic test is widely accepted in English countries. Its score is one of keys for university or college admission. This 4000 IELTS vocabulary is to help you own a strong words list in future IELTS academic test."
  };
}
export function selectLanguage(country :Country="en"){
    switch (country) {
        case "cn":return  new CN
        case "en": return new EN
    }
}
