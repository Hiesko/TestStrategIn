const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGODB_URL, {   
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !'));
