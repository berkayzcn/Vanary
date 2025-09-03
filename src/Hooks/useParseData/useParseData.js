export default function (data) {

    return Object.keys(data) // Object.keys(data) nasıl bir obje verirsen ver buunun 'keylerini' bir array yapısında return eder
        .map(key => {  
            return { 
                id: key,
                ...data[key], //o data yapısına git o key hangisne denk geliyorsa o datayı buraya çıkar, username date vs 
            }
        })



        .sort(function (a, b) {
            return a.date > b.date ? -1 : a.date > b.date ? 1 : 0;
        });

}

//map bir arrya retturn eder.geriye array dönemesini istedğimz şeylerde map kullanırız
//gelen key i id oalrak atadık

//o data yapısına git o key hangisne denk geliyorsa o datayı buraya çıkar


// {
//     "-OW9wkGitSbOjGRWUERx": {
//         "date": "2025-07-27T08:14:57.136Z",
//         "userName": "berkay"
//     }
// }

//yukardaki halinden aşağıdaki haline çevirir objeyi

// {
//     "id": "-OW9wkGitSbOjGRWUERx",
//     "date": "2025-07-27T08:14:57.136Z",
//     "userName": "berkay"
// }

