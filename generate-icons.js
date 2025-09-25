// generate-icons.js
const faviconsModule = require("favicons"); // <- require the module
const favicons = faviconsModule.default || faviconsModule; // <- get the function
const { writeFileSync } = require("fs");

const source = "public/logo.png"; // Your high-quality logo

const configuration = {
    path: "/",
    appName: "ResuMate",
    appDescription: "AI-powered resume analysis and scoring tool.",
    developerName: "ResuMate",
    developerURL: "https://www.resumateai.ca/",
    icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        favicons: true,
        windows: true,
        yandex: false,
    },
};

favicons(source, configuration, (error, response) => {
    if (error) {
        console.error(error.message);
        return;
    }

    response.images.forEach((image) => {
        writeFileSync(`public/${image.name}`, image.contents);
    });

    response.files.forEach((file) => {
        writeFileSync(`public/${file.name}`, file.contents);
    });

    console.log("✅ Icons generated successfully in /public!");
});
