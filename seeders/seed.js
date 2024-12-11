const sequelize = require('../models'); // Corrigez le chemin
const User = require('../models/User'); // Importez le modèle User

(async () => {
    try {
        // Synchronisez la base de données
        await sequelize.sync({ force: true });

        // Insérez un utilisateur admin
        const hashedPassword = await require('bcrypt').hash('root', 10);
        await User.create({
            username: 'admin1',
            password: hashedPassword,
            role: 'admin',
        });

        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
})();
