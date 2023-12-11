// Import computer parts
const ComputerParts = require('./ComputerParts.json');

module.exports = {
    siteUrl: 'https://www.turbokokona.com',
    generateRobotsTxt: true,
    outDir: './public',
    fileName: 'sitemap.xml', // Spécifiez le nom de fichier souhaité
    sitemapSize: 50000,
    sitemap: async () => {
        const products = ComputerParts.phone; // Remplacez par la source de vos produits
        const paths = products.map((product) => `/product/${product.id}`);
        return paths;
    },
};