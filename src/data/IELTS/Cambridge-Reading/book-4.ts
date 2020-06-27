import { initQStatement, initQDragMatch, initQMultiSelect } from ".";
import { IELTSReadingMaterial } from "./types";

export const data: IELTSReadingMaterial = {
    title: 'These Misconceptions of Tropical Rainforests',
    section: 1,
    hint: 'You should spend about 20 minutes on Questions 1-14 which are based on Reading Passage 1 below.',
    paragraphs: [
        'Adults and children are frequently confronted with statements about the alarming rate of loss of tropical rainforests. For example, one graphic illustration to which children might readily relate is the estimate that rainforests are being destroyed at a rate equivalent to one thousand football fields every forty minutes &mdash; about the duration of a normal classroom period. In the face of the frequent and often vivid media coverage, it is likely that children will have formed ideas about rainforests &mdash; what and where they are, why they are important, what endangers them &mdash; independent of any formal tuition. It is also possible that some of these ideas will be mistaken.',
        'Many studies have shown that children harbor misconceptions about ‘pure’,curriculum science. These misconceptions do not remain isolated but become incorporated into a multifaceted, but organized, conceptual framework, making it and the component ideas, some of which are erroneous, more robust but also accessible to modification. These ideas may be developed by children absorbing ideas through the popular media. Sometimes this information may be erroneous. It seems schools may not be providing an opportunity for children to re-express their ideas and so have them tested and refined by teachers and their peers.',
        'Despite the extensive coverage in the popular media of the destruction of rainforests, little formal information is available about children’s ideas in this area,the aim of the present study is to start to provide such information, to help teachers design their educational strategies to build upon correct ideas and to displace misconceptions and to plan programs in environmental studies in their schools.',
        'The study surveys children’s scientific knowledge and attitudes to rainforests. Secondary school children were asked to complete a questionnaire containing five open-form questions. The most frequent responses to the first question were descriptions which are self-evident from the term ‘rainforest’. Some children described them as damp, wet or hot. The second question concerned the geographical location of rainforests. The commonest responses were continents or countries: Africa(given by 43% of children), South America (30%), Brazil (25%). Some children also gave more general locations, such as being near the Equator.',
        'Responses to question three concerned the importance of rainforests. The dominant idea, raised by 64% of the pupils, was that rainforests provide animals with habitats.Fewer students responded that rainforests provide plant habitats, and even fewer mentioned the indigenous populations of rainforests. More girls (70%) than boys (60%) raised the idea of rainforest as animal habitats.',
        'Similarly, but at a lower level, more girls (13%) than boys (5%) said that rainforests provided human habitats. These observations are generally consistent with our previous studied of pupils’ views about the use and conservation of rainforests, in which girls were shown to be more sympathetic to animals and expressed views which seem to place an intrinsic value on non-human animal life.',
        'The fourth question concerned the causes of the destruction of rainforests. Perhaps encouragingly, more than half of the pupil (59%) identified that it is human activities which are destroying rainforests, some personalizing the responsibility by the use of terms such as ‘we are’. About 18% of the pupils referred specifically to logging activity.',
        'One misconception, expressed by some 10% of the pupils, was that acid rain is responsible for rainforest destruction; a similar proportion said that pollution is destroying rainforests. Here, children are confusing rainforest destruction with damage to the forests of Western Europe by these factors. While two fifths of the students provided the information that the rainforests provide oxygen, in some cases this response also embraced the misconception that rainforest destruction would reduce atmospheric oxygen, making the atmosphere incompatible with human life on Earth.',
        'In answer to the final question about the importance of rainforest conservation, the majority of children simply said that we need rainforests to survive. Only a few of the pupils (6%) mentioned that rainforest destruction may contribute to global warming. This is surprising considering the high level of media coverage on this issue. Some children expressed the idea that the conservation of rainforests is not important.',
        'The results of this study suggest that certain ideas predominate in the thinking of children about rainforests. Pupils’ responses indicate some misconceptions in basic scientific knowledge of rainforests’ ecosystems such as their ideas about rainforests as habitats for animals, plants and humans and the relationship between climatic change and destruction of rainforests.',
        'Pupils did not volunteer ideas that suggested that they appreciated the complexity of causes of rainforest destruction. In other words, they gave no indication of an appreciation of either the rage of ways in which rainforests are important or the complex social, economic and political factors which drive the activities which are destroying the rainforests. One encouragement is that the results of similar studies about other environmental issues suggest that older children seem to acquire the ability to appreciate value and evaluate conflicting views. Environmental education offers an arena in which these sills can be developed, which is essential fore these children as future decision –makers.'
    ],
    questions: [
        {
            ...initQStatement({ from: 1, to: 8 },
                [
                    { desc: 'The plight of the rainforests has largely been ignored by the media.', correntAnswer: "notGiven", inputAnswer: undefined },
                    { desc: 'Children only accept opinions on rainforests that they encounter in their classrooms.', correntAnswer: "notGiven", inputAnswer: undefined },
                    { desc: 'It has been suggested that children hold mistaken views about the ‘pure’science that they study at school.', correntAnswer: "notGiven", inputAnswer: undefined },
                    { desc: 'The fact that children’s ideas about science form part of a larger framework of ideas means that it is easier to change them.', correntAnswer: "notGiven", inputAnswer: undefined },
                    { desc: 'The study involved asking children a number of yes/no questions such as ‘Are there any rainforests in Africa?’', correntAnswer: "notGiven", inputAnswer: undefined },

                    { desc: 'Girls are more likely than boys to hold mistaken views about the rainforests’destruction.', correntAnswer: "notGiven", inputAnswer: undefined },
                    { desc: 'The study reported here follows on from a series of studies that have looked at children’s understanding of rainforests.', correntAnswer: "false", inputAnswer: undefined },
                    { desc: 'A second study has been planned to investigate primary school children’s ideas about rainforests.', correntAnswer: "notGiven", inputAnswer: undefined },

                ]
            )
        },
        {
            ...initQDragMatch({ from: 9, to: 13 },
                [
                    { desc: 'What was the children’s most frequent response when asked where the rainforests were?', answer: 'A' },
                    { desc: 'What was the most common response to the question about the importance of the rainforests?', answer: 'A' },
                    { desc: 'What did most children give as the reason for the loss of the rainforests?　', answer: 'A' },
                    { desc: 'Why did most children think it important for the rainforests to be protected?　', answer: 'A' },
                    { desc: 'Which of the responses is cited as unexpectedly uncommon, given the amount of time spent on the issue by the newspapers and television?', answer: 'A' }
                ],
                [
                    { order: 'A', content: 'There is a complicated combination of reasons for the loss of the rainforests.  ' },
                    { order: 'B', content: 'The rainforests are being destroyed by the same things that are destroying the forests of Western Europe. ' },
                    { order: 'C', content: 'Rainforests are located near the Equator.' },
                    { order: 'D', content: 'Brazil is home to the rainforests.  ' },
                    { order: 'E', content: 'Without rainforests some animals would have nowhere to live.' },
                    { order: 'F', content: 'Rainforests are important habitats for a lot of plants.' },
                    { order: 'G', content: 'People are responsible for the loss of the rainforests.    ' },
                    { order: 'H', content: 'The rainforests are a source of oxygen.' },
                    { order: 'I', content: 'Rainforests are of consequence for a number of different reasons.  ' },
                    { order: 'J', content: 'As the rainforests are destroyed, the world gets warmer.' },
                    { order: 'K', content: ' Without rainforests there would not be enough oxygen in the air.' },
                    { order: 'L', content: 'There are people for whom the rainforests are home.' },
                    { order: 'M', content: 'Rainforests are found in Africa.  ' },
                    { order: 'N', content: 'Rainforests are not really important to human life.' },
                    { order: 'O', content: 'The destruction of the rainforests is the direct result of logging activity' },
                    { order: 'P', content: 'Humans depend on the rainforests for their continuing existence. ' },
                ]
            )
        },
        {
            ...initQMultiSelect({ fixedNumber: 14 }, [{
                item:
                    [
                        { content: '', order: "A" }
                    ],
                correntAnswer: "false",
                inputAnswer: undefined
            }])
        }
    ]
}

