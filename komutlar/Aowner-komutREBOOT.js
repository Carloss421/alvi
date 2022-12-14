const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  
        let embed = new Discord.MessageEmbed()
        .setTitle("Reload")
        .setDescription("Bu komutu sahibim kullanabilir")
        .setColor("#cdf785");
        if(message.author.id !== '739411430171738142') return message.channel.send(embed);

        if(!args[0].toLowerCase()) return message.channel.send("Bir komut ismi gir")

        let komutİsim = args[0].toLowerCase()

        try {

          delete require.cache[require.resolve(`./${komutİsim}.js`)]
          const pull = require(`./${komutİsim}.js`)
          client.commands.set(pull.help.name, pull)
          message.channel.send(`Başarıyla \`${komutİsim}\` adlı komut yeniden başlatıldı!`)
        }

        catch (e) {
          console.log(e)
          return message.channel.send(`Aovğ! Bir hatayla karşılaştık!\n${e}`)
        }


      }


exports.conf = {
    aliases: ['komutyenile','yenile','reload'],
    permLevel: 0,
    kategori: "Sahip"
};

exports.help = {
    name: "komut-yenile",
    description: "Belirttiğiniz komutu yeniden başlatır.",
    usage: "komut-yenile"
};