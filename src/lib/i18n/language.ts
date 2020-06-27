export const Lang: any = {
  en: {
    nav: ['Exam', 'Home', 'Help', 'Privacy', 'Support', 'About'],
    leftNav: {
      menu1: { name: 'Get Started', subMenu: ['Irregular Verb', 'Student Info'] },
      menu2: { name: 'Write', subMenu: ['Vocabulary', 'Article', 'Article2'] },
      menu3: { name: 'Statistic', subMenu: ['Vocabulary'] },
      menu4: { name: 'Charts', subMenu: ['Hot words(coming soon)'] },
      menu5: {
        name: 'Games',
        subMenu: ['2048(coming soon)', 'GWeAreCouple', 'Amusement Park'],
      },
      menu6: {
        name: 'Vocabulary',
        subMenu: ['EssentialWord', 'IELTS', 'TOEFL', 'Dictation'],
      },
    },
  },
  cn: {
    nav: ['考试', '主页', '帮助', '隐私', '支持', '关于'],
    leftNav: {
      menu1: { name: '入门', subMenu: ['不规则动词', '学生信息'] },
      menu2: { name: '录入', subMenu: ['词汇', '文章', '文章2'] },
      menu3: { name: '统计', subMenu: ['词汇'] },
      menu4: { name: '图表', subMenu: ['常用词汇(准备中)'] },
      menu5: {
        name: '游戏',
        subMenu: ['2048(准备中)', '配对', '游乐场'],
      },
      menu6: {
        name: '词汇',
        subMenu: ['核心词汇', '雅思', '托福', '默写'],
      },
    },
  },
  jp: {
    nav: ['試験', 'ホーム', '助けて', 'プライバシー', 'サポート', '私について'],
    leftNav: {
      menu1: { name: '入门', subMenu: ['不规则动词', '學生情報'] },
      menu2: { name: '錄入', subMenu: ['詞彙', '文章', '文章2'] },
      menu3: { name: '統計', subMenu: ['詞彙'] },
      menu4: { name: '圖表', subMenu: ['ホットワード(近日公開)'] },
      menu5: {
        name: '遊戲',
        subMenu: ['2048(近日公開)', '配對', '遊樂園'],
      },
      menu6: {
        name: '詞彙',
        subMenu: ['必須の語彙', 'IELTS', 'TOEFL', 'ディクテーション'],
      },
    },
  },
}

export abstract class Multilingual {
  abstract nav: {
    n1: string
    n2: string
    n3: string
    n4: string
    n5: string
    n6: string
  }
}
