import saveRegulationToFirestore from "../services/saveRegulationToFirestore";

export default () => {
        for(let x = 0; x < 4; x++){
            const category = "selektion"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Stay at home"}, () => {
            })
        }
        for(let x = 0; x < 2; x++){
            const category = "selektion"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Move to friends"})
        }
        for(let x = 0; x < 1; x++){
            const category = "selektion"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Send grandma on vacation"})
        }

        for(let x = 0; x < 4; x++){
            const category = "modifikation"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Video call"})
        }

        for(let x = 0; x < 2; x++){
            const category = "modifikation"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Wash hands frequently"})
        }

        for(let x = 0; x < 1; x++){
            const category = "modifikation"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Eat lots of fruit"})
        }

        for(let x = 0; x < 1; x++){
            const category = "modifikation"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Wrap grandma in cling film"})
        }

        for(let x = 0; x < 5; x++){
            const category = "aufmerksamkeit"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Watch TV"})
        }

        for(let x = 0; x < 3; x++){
            const category = "aufmerksamkeit"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Play board games"})
        }

        for(let x = 0; x < 1; x++){
            const category = "aufmerksamkeit"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Computer-Gaming"})
        }

        for(let x = 0; x < 3; x++){
            const category = "aufmerksamkeit"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Curry the cat"})
        }

        for(let x = 0; x < 5; x++){
            const category = "umdeutung"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "I make new online contacts with my grandma"})
        }

        for(let x = 0; x < 2; x++){
            const category = "umdeutung"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "A lot of time to read"})
        }

        for(let x = 0; x < 3; x++){
            const category = "umdeutung"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Grandma's apartment has never been so clean"})
        }

        for(let x = 0; x < 1; x++){
            const category = "umdeutung"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Time for sport"})
        }

        for(let x = 0; x < 1; x++){
            const category = "reaktion"
            saveRegulationToFirestore({category: category, emotion: "fear", name: "Yoga/Meditation"})
        }
}
