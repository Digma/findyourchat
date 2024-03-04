
// import type { Question } from "../../personality/types";

// class AnswersAndQuestion {
//     constructor (questions: Question[]) {
//         this.questions = questions;
//     }
//     // toString() {
//     //     return this.questions.map((q) => q.title).join(", ");
//     // }
// }

// // Firestore data converter
// var cityConverter = {
//     toFirestore: function(q: Question) {
//         return {
//             name: city.name,
//             state: city.state,
//             country: city.country
//             };
//     },
//     fromFirestore: function(snapshot, options){
//         const data = snapshot.data(options);
//         return new City(data.name, data.state, data.country);
//     }
// };