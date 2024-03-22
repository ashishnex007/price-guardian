import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractDescription, extractPrice } from '../utils';

export async function scrapeAmazonProduct(url : string){
    if(!url) return;

    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_36e8ff06-zone-unblocker:n8sbg9bxl0bq -k https://lumtest.com/myip.json

    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;
    const options = {
        auth : {
            username: `${username}-session-${session_id}`,
            password,
        },
        host : 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }
    try {
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);

        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $('.a-price-whole').first()
          );
        const currency = $('.a-price-symbol').first().text();
        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
          );
        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
        const images = 
        $('#imgBlkFront').attr('data-a-dynamic-image') || 
        $('#landingImage').attr('data-a-dynamic-image') ||
        {} ;
        // @ts-ignore
        const imageUrls = Object.keys(JSON.parse(images));
        const discount = $('.savingsPercentage').text().replace(/[-%]/g,"");
        const featureBullets = $('#featurebullets_feature_div');
        const description = featureBullets.find('ul.a-unordered-list.a-vertical.a-spacing-mini').text().trim();


        const data = {
            url,
            currency: currency || "₹",
            image: imageUrls[0],
            title,
            currentPrice: currentPrice,
            originalPrice: originalPrice,
            priceHistory: [],
            discountRate: Number(discount),
            category: 'category',
            reviewsCount: 100,
            stars: 5,
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
        }

        return data;

    } catch (error: any) {
        throw new Error(`failed to scrape product ${error.message}`);
    }
}