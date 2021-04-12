const express = require("express")
const { v4 : uuid } = require("uuid")
const cors = require("cors")
const bcrypt = require("bcrypt");
const PORT = 4000;

const app = express()

app.use(cors())
app.use(express.json())

const movieList = [
    { id: uuid(), img: 'https://www.clandestinecritic.co.uk/wp-content/uploads/2010/04/Avatar-movie-poster.jpg', title: 'Avatar', rating: 4.9, description: 'Detailed Description', year: '2009', duration: '1hr 10mins', price: 3500, stock: 9, rentedTo: [], trailer: 'RU8mQmD-U88'},

    { id: uuid(), img: 'https://www.clandestinecritic.co.uk/wp-content/uploads/2021/01/The-New-Mutants-movie-poster.jpg', title: 'The New Mutants', rating: 4.4, description: 'Detailed Description', year: '2020', duration: '1hr 30mins', price: 4200, stock: 3, rentedTo: [], trailer: 'urQDfk7TKvo'},

    { id: uuid(), img: 'https://www.clandestinecritic.co.uk/wp-content/uploads/2020/07/The-Old-Guard-movie-poster.jpg', title: 'The Old Guard', rating: 4.8, description: 'Detailed Description', year: '2020', duration: '1hr 30mins', price: 5200, stock: 5, rentedTo: [], trailer: 'MP-IfMYhSX0'},

    { id: uuid(), img: 'https://www.clandestinecritic.co.uk/wp-content/uploads/2019/12/AvengersEndgamePoster.jpg', title: 'Avengers - Endgame', rating: 3.9, description: 'Coming out of the screen afterwards, we were still buzzing and my emotions were so close to the surface whenever I remembered certain scenes and dramatic beats – we would discuss them, away from ears of people who hadn’t seen the film, trying to absorb all that happened. As I said in the opening paragraph, I’ve never had such an emotional response to a film in all my years – I don’t know if it’s because I’m getting older and so have lost the veneer of ‘cool’ that male cinema goers must enshrine themselves with or because I am more in touch with my feelings, but I was pinballing between emotional states for the rest of the day', year: '2019', duration: '1hr 30mins', price: 5200, stock: 5, rentedTo: [], trailer: 'hA6hldpSTF8'},

    { id: uuid(), img: 'https://www.clandestinecritic.co.uk/wp-content/uploads/2007/05/Batman-Begins-poster.jpg', title: 'Batman Begins', rating: 3.5, description: 'After the debacle that was Batman and Robin nearly killed off the possibility of seeing the Dark Knight on the silver screen again, it’s a delight to see a film that captures the special qualities of the Caped Crusader, with the aspects of reality (that can exist within a movie based on a billionaire who dresses up as a bat to beat up crooks can be allowed) that bring home the appeal of the Batman; he could be you or me, if only', year: '2007', duration: '1hr 30mins', price: 3200, stock: 1, rentedTo: [], trailer: 'QhPqez3CwiM'},

    { id: uuid(), img: 'https://www.clandestinecritic.co.uk/wp-content/uploads/2015/05/AvengersAgeOfUltronPoster.jpg', title: 'Avengers - Age of Ultron', rating: 2.3, description: 'Whedon has a done a marvellous (pardon the pun) job – he handles the huge cast with a deftness and lightness of touch that belies how tough it is. He uses misdirection to surprise us, he uses emotion to power the story and the characters (when Hawkeye tells someone, ‘If you go outside, you’re an Avenger’, it brought a lump to my throat), he understands and communicates his understanding of the essence of what it means to be an Avenger, and the use of Mjolnir to prove worthiness is a brilliant moment. If I have to mention something to partially negate all this praise, I found the visualisation of the Vision a little strange – the comic-book version I’m used to has very smooth facial features, more synthetic and less human, whereas this is obviously the wonderful Paul Bethany with some things on his face. I guess I’ll get used to it the more I watch it (and I will be rewatching it plenty), but it seemed less genuine than the rest of the other Avengers.', year: '2015', duration: '1hr 30mins', price: 4100, stock: 0, rentedTo: [], trailer: 'zi4VAPVYFA4'},

    { id: uuid(), img: 'https://www.clandestinecritic.co.uk/wp-content/uploads/2012/07/JohnCarterPoster.jpg', title: 'John Carter', rating: 3.4, description: 'The quality of the film didn’t matter – the only aspect that mattered was how much it cost. I stopped reading articles about the film when the budget was mentioned. Yes, films are expensive, CGI films more so, and it’s a gamble whenever a film is made. However, it’s only because of journalists talking about it that we know about this stuff in the first place. I don’t care – I want to watch a film, made by professionals, for entertainment. This film succeeded. It wasn’t perfect but it was enjoyable. You could see where lots of other films have appropriated ideas (George Lucas has stolen big chunks of it: an intelligent princess fighting against oppressors, a loyal pet-like alien, arena scenes where heroes fight against large monsters, the desert as a setting for an alien world) but it was enjoyable in its own right, despite the fact that the original stories have inspired so many other films (the first story, published as a book as A Princess Of Mars, was first serialised as Under The Moon Of Mars in a pulp magazine 100 years ago).', year: '2012', duration: '1hr 45mins', price: 4200, stock: 2, rentedTo: [], trailer: 'XavXWxqZvLY'},
]

const users = []

app.get('/', (req, res) => {
    res.json(movieList)
})

app.post('/auth/create', async (req, res) => {
    const user = req.body
    // const salt = await bcrypt.genSalt(20);
    // user.password = await bcrypt.hash(user.password, salt);
    user['id'] = uuid();
    users.push(user)
    res.json(user);
})

app.post('/auth/login', async (req, res) => {
    const form = req.body
    // const salt = await bcrypt.genSalt(20);
    // const pw = await bcrypt.hash(form.password, salt);

    const result = users.filter(({email, password}) => form.email == email && form.password == password )[0]
    if(result) {
        res.json(result)
    }
    else {
        res.status(500).send('Invalid Email or Password')
    }
})

app.post('/movie/rent', async (req, res) => {
    const data = req.body
    let newArr = await movieList.map((movie) => {
        if(movie.id == data.movieId){ 
          let rented = movie.rentedTo
          return { ...movie, rentedTo: [...new Set([...rented, data.userId])] } 
        } 
        else { return movie } })
    res.json(newArr)
})

app.listen(PORT, () => {
    console.log("server is running on port " + PORT)
})