const { SlashCommandBuilder } = require('@discordjs/builders');
const safeMessage = require('../scripts/safeMessage');
const Yml = require('yaml');
const Fs = require('fs');

const defaultLang = `# Axis fun (ping) language
ping:
  - 'Pong! <a:sadsponge:901325244353093674>'
  - 'Pong! <a:bingusangry:901325252318089276>'
  - 'Ping <:huh:901325246165045258>'
  - 'Ping Ping <a:funnycursed:901325245854662667>'`;

module.exports = new create();

function create(){
    let language = {};
    this.versions = ['1.1.0', '1.1.1', '1.1.2'];

    this.start = (client, action, conf, lang) => {
        if(!Fs.existsSync('./config/ping.yml')) Fs.writeFileSync('./config/ping.yml', defaultLang);
        language = Yml.parse(Fs.readFileSync('./config/ping.yml', 'utf-8'));

        return true;
    }
    this.execute = async (args, message, client, action) => {
        await safeMessage.reply(message, action.get(language.ping));
    }
    this.slash = {
        command: new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Ping!"),
        async execute(interaction, client, action){
            await interaction.reply(`${action.get(language.ping)}`);
        }
    }
}