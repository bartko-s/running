import express from 'express'
import path from 'path'
import {createProxyMiddleware} from 'http-proxy-middleware';
import expressHandlebars from 'express-handlebars'

const isProduction =  process.env.NODE_ENV === 'production'

const getAssetVersion = (function() {
    const createVersion = (): number => {
        return Math.floor(new Date().getTime() / 1000)
    }

    const v = createVersion();
    return (fresh: boolean): number => {
        return fresh ? createVersion() : v;
    }
})()

const app: express.Application = express();
const port = 8082;

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

if(isProduction) {
    app.use('/static', express.static('../browser/static'));
} else {
    app.use('/static', createProxyMiddleware({
        target: 'http://node-browser:8080',
    }));
}

app.use('/api', express.static('../browser/api'));

app.get('*', (req, res) => {
    return res.render('index', {
        layout: false,
        assetVersion: getAssetVersion(!isProduction)
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
