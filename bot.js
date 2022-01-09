const express = require("express");
const app = express();
const http = require("http");
app.get(".", (request, response) => {
  console.log(`BOT AKTIF!`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://alvibotaltyapii.glitch.me/`);
}, 60000);
const Discord = require("discord.js");
const client = new Discord.Client({ disableMentions: "everyone" });
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
client.queue = new Map();
require("./util/eventLoader")(client);
require("moment-duration-format");

var prefix = ayarlar.prefix

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
client.setMaxListeners(30)
/*
client.on("ready", () => {
  var actvs = [
    `🎀 Yardım almak için a!yardım`,
    `🔔 Yeni Özellikler İçin a!yardım-güncelleme`,
    `🤖 Botu eklemek için a!yardım-bot`
  ];

  client.user.setActivity(
    actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)],
    { type: "WATCHING" }
  );
  setInterval(() => {
    client.user.setActivity(
      actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)],
      { type: "WATCHING" }
    );
    // IZLIYOR = WATCHING
    // OYNUYOR = PLAYING
    // YAYINDA = STREAMING
    // AKTIF = ONLINE
    // RAHATSIZ ETMEYIN = DND
    // BOSTA = IDLE
    // CEVRIMDISI = OFFLINE
  }, 15000);
});*/

client.elevation = message => {
  if (!message.guild) {
    return;
  } 
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};


//     [-----------------> BOT ETIKET <---------------] \\
client.on('message', async message => {
const prefixÖ = await ayarlar.prefix;

  const embed = new Discord.MessageEmbed()
.setThumbnail(client.user.avatarURL())
.setDescription(`
<@${message.author.id}>

Yardım menüsü için **${prefixÖ}yardım** yazman gerekli olacaktır :)`)
.setColor('RANDOM')
  if(message.content == `<@!828267474192564245>`) return message.channel.send(embed);
});


//        [----------------------->  GOREVLER <-----------------]        \\

client.on('message', message  => {


let user = message.author;
let prefixX = ayarlar.prefix;
if(message.author.bot || message.content.startsWith(prefixX)) return;

db.add(`görevMesajGönder.${message.guild.id}.${user.id}`, 1)
}); 

//     [-----------------> Afk <------------------]  \\

client.on("message", async message => {
const dil = require("./Languages/dil");
const dils = new dil("dil", "diller");

  let en = require("./Languages/dil/en.json");
  let tr = require("./Languages/dil/tr.json");

  var lg = dils.get(`dilang.${message.guild.id}`)
  if (lg == "en") {
var lang = en;
  }
  if (lg == "tr") {
var lang = tr;
  }
  if(!lg) return;

  let prefix = ayarlar.prefix;
  let kullanıcı = message.mentions.users.first() || message.author;
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`);
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`);
  let sebep = afkkullanıcı;
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
if (afkdkullanıcı) {message.channel.send(new Discord.MessageEmbed().setDescription(`${lang.systemAFK.msg3} <@${kullanıcı.id}>.`)
      );
      db.delete(`afk_${message.author.id}`);
    }
if (afkkullanıcı) return message.channel.send(`${message.author}\`${kullanıcı.tag}\` ${lang.systemAFK.msg4}\n${lang.systemAFK.msg5}: \`${sebep}\``
      );
  }
  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(
        new Discord.MessageEmbed().setDescription(`${lang.systemAFK.msg3} <@${kullanıcı.id}>.`)
      );
      db.delete(`afk_${message.author.id}`);
    }
  }
});


//     [-----------------> Otorol <------------------]  \\
//     [-----------------> Fake <------------------]  \\
client.on('guildMemberAdd', async member => {

  const database = require('quick.db');
  if(member.user.bot) return;
  
  const kanal = member.guild.channels.cache.get(await database.fetch(`fakeK_${member.guild.id}`) || 0);
  const zaman = await database.fetch(`fakeS_${member.guild.id}`);
  const rol = member.guild.roles.cache.get(await database.fetch(`fakeR_${member.guild.id}`) || 0);
  if(!kanal || !zaman || !rol) return;

  if(member.user.createdAt.getTime() < require('ms')(zaman)) {

    member.roles.add(rol.id);
    const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Fake Tetikleyici')
    .setDescription(`**${member.user.tag}** Fake sistemine takıldı!`);
    return kanal.send(embed);

  } else return;

});
//     [-----------------> Sayaç <------------------]  \\
client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find("name", skanal9);
  if (!skanal31) return;
  skanal31.send(
    new Discord.MessageEmbed()
      .setDescription(`
:inbox_tray: <@${member.user.id}> sunucuya katıldı, **${sayac}** kişi olmamıza **${sayac -member.guild.members.size}** kişi kaldı.`)
      .setColor("GREEN")
      .setTitle("Alvi - Sayaç")
  );
});

client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find("name", skanal9);
  if (!skanal31) return;

  skanal31.send(
    new Discord.MessageEmbed()
      .setDescription(`
:outbox_tray: <@${member.user.id}> adlı kullanıcı sunucudan ayrıldı. **${sayac}** kullanıcı olmaya **${sayac -member.guild.members.size}** kullanıcı kaldı.`
      )
      .setColor("RED")
      .setTitle("Alvi - Sayaç")
  );
});

//                        OYUNLAR                           \\
client.on("message", (msg, message, guild) => {
  if (msg.content.toLowerCase() === prefix +"invite") {
    const eris = new Discord.MessageEmbed().setDescription(
      `[Destek Sunucum](https://discord.gg/NAzGC2cxXR)`
    );
    msg.channel.send(eris);
  }
});

client.on("guildCreate", async(guild, message) => {

let alındı = `${ayarlar.oldu2}`
let alınıyor = "<a:yükleniyor:839266395308687421>"

  const emmmmbed = new Discord.MessageEmbed()
    .setDescription(`
  **Selamlar chat ben geldim sabahlara kadar kopmaya hazır mısınız? Bende bütün sistemler var rahat olun sadece** \`a!yardım\` **yazarak komutlarıma bakman yeterli. Hatalı komutlar** \`a!yardım-bot\``)

  let defaultChannel = "";
  
  guild.channels.cache.forEach(channel => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });
  const alın = await defaultChannel.send("Sunucu Verileri alınıyor.")
  alın.edit("Sunucu Verileri alınıyor..")
  alın.edit("Sunucu Verileri alınıyor...").then(m => m.delete({ timeout: 2542 }))
  defaultChannel.send(emmmmbed);
});
/*
client.on('guildCreate', guild => {
let kanal = guild.channels.filters(c => c.type === "text").random()
const embed = new Discord.MessageEmbed()
.setTitle('Selamlar chat ben geldim sabahlara kadar kopmaya hazır mısınız? Bende bütün sistemler var rahat olun')
kanal.send(embed)
    
});
*/


// ------------------> [Bot Koruma] <-------------------------- \\

client.on("guildMemberAdd", async member => {
  if (db.has(`botkoruma_${member.guild.id}`) === false) return;
  if (member.user.bot === false) return;
  if (db.has(`botİzinli_${member.id}`) === true) return;
let p = db.fetch(`prefix_${member.guild.id}`) || ayarlar.prefix;
  
  member.kick(member, `Bot koruması aktif!`);

return member.guild.owner.send(
    `Sunucunuza bir bot eklendi ve sunucudan otomatik olarak atıldı, sunucuya eklenmesini onaylıyor iseniz \`${p}giriş-izni ${member.id}\``
  );
});


// ----------------> [Resimli Hoşgeldin Hoşçakal] <-------------- \\
client.on("guildMemberRemove", async member => {
  
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
  if (!canvaskanal) return;

  const request = require("node-superfetch");
  const Canvas = require("canvas"), Image = Canvas.Image, Font = Canvas.Font, path = require("path");

  var randomMsg = ["Sunucudan Ayrıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/Wrn1XW.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-güle-güle.png"
  );

    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
    );
    if (member.user.bot)
      return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
  
});

client.on("guildMemberAdd", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
 if(!canvaskanal) return;
  
  if (!canvaskanal || canvaskanal ===  undefined) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucuya Katıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/UyVZ4f.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) ;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-hosgeldin.png"
  );

  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
});
// ----------------> [Hoşgeldin - Hoşçakal] <---------------- \\
client.on("guildMemberAdd", async(member, message, guild) => {
let kanal = db.fetch(`hoşgeldinK_${member.guild.id}`)

let hoşgeldinK = db.fetch(`hosgeldinK_${member.guild.id}`)
if(!hoşgeldinK) return;
if(!kanal) return;
var hoşglend = new Discord.MessageEmbed()
.setColor("GREEN")
.setTitle(":inbox_tray: Sunucuya yeni bir üye katıldı!")
.setThumbnail(member.user.avatarURL)
.setDescription("Ooo kimleri görüyorum, "+ member +" sunucuya hoşgeldin, seninle beraber "+ member.guild.memberCount+" kişiye ulaştık.")
.addField(`Üye ID:`, `${member.id}`, true)
.addField(`Üye Adı`, `${member}`, true)
return member.guild.channels.cache.get(hoşgeldinK).send(hoşglend) 
});
  
client.on("guildMemberRemove", async(member, message, guild) => {
  let kanal = db.fetch(`hoşgeldinK_${member.guild.id}`)
  if(!kanal) return;
var hoşglend = new Discord.MessageEmbed()
.setColor("RED")
.setTitle(":inbox_tray: Sunucu'dan bir üye ayrıldı!")
.setThumbnail(member.user.avatarURL)
.setDescription("Oof be kanka, "+ member +" sunucu'dan ayrıldı, senin çıkmanla beraber "+ member.guild.memberCount+" kişi kaldık.")
.addField(`Üye ID:`, `${member.id}`, true)
.addField(`Üye Adı`, `${member}`, true)
return member.guild.channels.cache.get(kanal).send(hoşglend) 

}) 
// ----------------> [Güvenlik] <------------------ \\
client.on('guildMemberAdd', member => {
     let kanal = db.fetch(`güvenlik.${member.guild.id}`)
     if(!kanal) return;

       let aylar = {
               "01": "Ocak",
               "02": "Şubat",
               "03": "Mart",
               "04": "Nisan",
               "05": "Mayıs",
               "06": "Haziran",
               "07": "Temmuz",
               "08": "Ağustos",
               "09": "Eylül",
               "10": "Ekim",
               "11": "Kasım",
               "12": "Aralık"
    }

  let bitiş = member.user.createdAt
      let günü = moment(new Date(bitiş).toISOString()).format('DD')
      let ayı = moment(new Date(bitiş).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
     let yılı =  moment(new Date(bitiş).toISOString()).format('YYYY')
     let saati = moment(new Date(bitiş).toISOString()).format('HH:mm')

let günay = `${günü} ${ayı} ${yılı} ${saati}`  

      let süre = member.user.createdAt
      let gün = moment(new Date(süre).toISOString()).format('DD')
      let hafta = moment(new Date(süre).toISOString()).format('WW')
      let ay = moment(new Date(süre).toISOString()).format('MM')
      let ayy = moment(new Date(süre).toISOString()).format('MM')
      let yıl =  moment(new Date(süre).toISOString()).format('YYYY')
     let yıl2 = moment(new Date().toISOString()).format('YYYY')

     let netyıl = yıl2 - yıl

     let created = ` ${netyıl} yıl  ${ay} ay ${hafta} hafta ${gün} gün önce`

     let kontrol;
     if(süre < 1296000000) kontrol = 'Bu hesap şüpheli!'
     if(süre > 1296000000) kontrol = 'Bu hesap güvenli!'

     let sunoç = new Discord.MessageEmbed()
     .setColor('GREEN')
     .setTitle(`${member.user.username} Katıldı`)
     .setDescription('<@'+member.id+'> Bilgileri : \n\n  Hesap oluşturulma tarihi **[' + created + ']** (`' + günay + '`) \n\n Hesap durumu : **' + kontrol + '**')
     .setTimestamp()
return member.guild.channels.cache.get(kanal).send(sunoç)
})
// ----------------> [Sa-AS] <--------------------- \\
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`ss_${msg.guild.id}`);
  if (db.has(`ss_${msg.guild.id}`) === true) {
    if (db.has(`üyelikk_${msg.author.id}`)) {
      if (msg.content.toLowerCase() === "sa") {
        msg.channel.send(
          `:wave: Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin `
        );
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selam") {
        msg.channel.send(
          `:wave: Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin `
        );
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "s.a") {
        msg.channel.send(
          `:wave: Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin `
        );
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selamun aleyküm") {
        msg.channel.send(
          `:wave: Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin `
        );
        db.add(`slmal_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selamün aleyküm") {
        msg.channel.send(
          `:wave: Aleyküm Selam, \`${msg.author.tag}\` Hoşgeldin `
        );
        db.add(`slmal_${msg.author.id}`, 1);
      }
    } else if (msg.content.toLowerCase() === "sa") {
      msg.channel.send(`Aleyküm Selam Hoşgeldin ${msg.author}`);
      db.add(`slmal_${msg.author.id}`, 1);
    } else if (msg.content.toLowerCase() === "selam") {
      msg.channel.send(`Aleyküm Selam Hoşgeldin ${msg.author}`);
      db.add(`slmal_${msg.author.id}`, 1);
    }
  }
});
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`ss_${msg.guild.id}`);
  if (db.has(`ss_${msg.guild.id}`) === true) {
    if (db.has(`üyelikk_${msg.author.id}`)) {
      if (msg.content.toLowerCase() === "as") {
        db.add(`slm_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "a.s") {
        db.add(`slm_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "aleyküm") {
        db.add(`slm_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "selam") {
        db.add(`slm_${msg.author.id}`, 1);
      }
      if (msg.content.toLowerCase() === "aleykümselam") {
        db.add(`slm_${msg.author.id}`, 1);
      }
    } else if (msg.content.toLowerCase() === "as") {
      db.add(`slm_${msg.author.id}`, 1);
    } else if (msg.content.toLowerCase() === "aleyküm selam") {
      db.add(`slm_${msg.author.id}`, 1);
    }
  }
});

// -----------------> [Caps-Engel] <-------------------- \\
client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel.send(`<@${msg.author.id}> Lütfen CAPS kapat!`).edit(`Bu sunucuda Caps Lock Engelleme sistemi kullanılıyor. Bu yüzden mesajını sildim!`).then(m => m.delete(5000))}}}}}});
// -------------------> [Kufur-Engel] <---------------- \\
client.on("message", message => {
if (db.has(`küfürE_${message.guild.id}`) === true) {
const küfür = [
"sikik","oç","orospu","orospu çocuğu","öröspü çöcüğü","Oç","oÇ","OÇ","sikerim","kafasız","porno","pörnö","pornocu","31","31.",
"31 çeken","am","amcık","am çorbası","amcık çorbası","tam sikmelik","sikiş","sikmek","sik çorbası","sik suyu","am suyu","amcık suyu","yarrak",
"yarrak kafalı","soğan sikli","siki başı sik","yarrağı kara","kara sikli","kara yarraklı","tam oç","tam öç","tem oç","tem öç","öç","yarrak kokusu",
"sik kokusu","ananı sikim","ananı sikiyim","anneni sikim","anneni sikiyim","ablanı sikim","ablanı sikiyim","gacını sikiyim","karını sikiyim",
"babanı sikiyim","aileni sikime oturturayım","muz istermisin","yarrağım","sikim","sik","nah","taşşak","taşak","yarak","yalak","kafasını siktiğim",
"kafası sikik","bira","içki","turbo","amk","sik","Sik","Sİk","SİK"]
 if (küfür.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        var ke = new Discord.MessageEmbed()
          .setColor("RED")
          .setAuthor("Küfür Engel (SISTEM)")
          .setDescription(`
Hey <@${message.author.id}>, Bu sunucuda küfürler **<@${client.user.id}>** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`);        
        db.add(`küfürEwarn_${message.author.id}`, 1);
        message.channel.send(ke).then(message => message.delete(5000));
}}}});

client.on("messageUptade", message => {
if (db.has(`küfürE_${message.guild.id}`) === true) {
const küfür = [
"sikik","oç","orospu","orospu çocuğu","öröspü çöcüğü","Oç","oÇ","OÇ","sikerim","kafasız","porno","pörnö","pornocu","31","31.",
"31 çeken","am","amcık","am çorbası","amcık çorbası","tam sikmelik","sikiş","sikmek","sik çorbası","sik suyu","am suyu","amcık suyu","yarrak",
"yarrak kafalı","soğan sikli","siki başı sik","yarrağı kara","kara sikli","kara yarraklı","tam oç","tam öç","tem oç","tem öç","öç","yarrak kokusu",
"sik kokusu","ananı sikim","ananı sikiyim","anneni sikim","anneni sikiyim","ablanı sikim","ablanı sikiyim","gacını sikiyim","karını sikiyim",
"babanı sikiyim","aileni sikime oturturayım","muz istermisin","yarrağım","sikim","sik","nah","taşşak","taşak","yarak","yalak","kafasını siktiğim",
"kafası sikik","bira","içki","turbo","amk"]
if (küfür.some(word => message.content.toLowerCase().includes(word))) {
if (!message.member.hasPermssion("ADMINISTRATOR")) {
message.delete();
var ke = new Discord.MessageEmbed()
.setColor("RED")
.setAuthor("Küfür Engel (SISTEM)")
.setDescription(`
Sen kendini akıllımı sanıyorsun ${message.author}
Bu sunucuda küfürler **<@${client.user.id}>** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`);
db.add(`küfürEwarn_${message.author.id}`, 1);
message.channel.send(ke).then(message => message.delete(5000));
}}}});
// -------------------> [Reklam-Engel] <---------------- \\
client.on("message", message => {
  if (db.has(`reklamE_${message.guild.id}`) === true) {
const reklam = [
".ml", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".tv", ".pw", ".io", ".me", 
".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", "glitch.me", "glitch.com"];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        var ke = new Discord.MessageEmbed().setColor("RANDOM").setAuthor("Reklam Engel (SISTEM)").setDescription(`Hey <@${message.author.id}>, Bu sunucuda reklamlar **${client.user.username}** tarafından engellenmektedir! Reklam yapmana izin vermeyeceğim!`);
        
        db.add(`reklamEwarn_${message.author.id}`, 1);
        message.channel.send(ke).then(message => message.delete(5000))}}}});
client.on("messageUptade", message => {
    if (db.has(`reklamE_${message.guild.id}`) === true) {
      const reklam = [
".ml", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", 
".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", "glitch.me","glitch.com"];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        var ke = new Discord.MessageEmbed().setColor("RANDOM").setAuthor("Reklam Engel (SISTEM)").setDescription(`Sen kendini akıllımı sanıyorsun <@${message.author.id}>
Bu sunucuda reklamlar **${client.user.username}** tarafından engellenmektedir! Reklam yapmana izin vermeyeceğim!`);
        
        db.add(`reklamEwarn_${message.author.id}`, 1);
        message.channel.send(ke).then(message => message.delete(5000))}}}});
// -------------------> [ROL-KORUMA] <------------------ \\
client.on("roleCreate", async (rolee, member, guild, message) => {
  let rolkoruma = await db.fetch(`rolK_${rolee.guild.id}`);
  if (rolkoruma == "acik") {
    rolee.delete();
    const embed = new Discord.MessageEmbed()
      .setDescription(
        "Sunucunuzda yeni bir rol oluşturuludu! fakat geri silindi! (Rol Koruma Sistemi)"
      )
      .setColor("BLACK");
    rolee.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});
client.on("roleDelete", async (rol, member, guild, message) => {
  let rolkoruma = await db.fetch(`rolK_${rol.guild.id}`);
  if (rolkoruma == "acik") {
    rol.clone();
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `Sunucunuzda rol silindi ama herşeyi ayarladım! (Rol Koruma Sistemi)`
      )
      .setColor("GREEN");
    rol.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});
client.on("roleUptade", async (roll, member, guild, message) => {
  let rolkoruma = await db.fetch(`rolK_${roll.guild.id}`);
  if (rolkoruma == "acik") {
    roll.old();
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `Sunucunuzda birtane rol'ün adı/rengi/yetkileri değiştirildi ama herşeyi eski haline getirdim! (Rol Koruma Sistemi)`
      )
      .setColor("GREEN");
    roll.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});
// ----------------> {Kanal-Koruma} <------------------------ \\
client.on("channelDelete", async (channel, message) => {
  let kanalkoruma = await db.fetch(`kanalk_${channel.guild.id}`);
  if (kanalkoruma == "acik") {
    if (!channel.guild.me.hasPermission("MANAGE_CHANNELS")) return;
    let guild = channel.guild;
    const logs = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" });
    let member = channel.members.get(logs.entries.first().executor.id);
    if (!member) return;
    if (member.hasPermission("ADMINISTRATOR")) return;
    channel
      .clone(channel.name, true, true, "Kanal silme koruması sistemi")
      .then(async klon => {
        if (!db.has(`korumalog_${guild.id}`)) return;
        let logs = guild.channels.find(ch => ch.id === db.fetch(`korumalog_${guild.id}`));
        if (!logs) return db.delete(`korumalog_${guild.id}`);
        else {
          const embed = new Discord.MessageEmbed()
            .setDescription(
              `Silinen Kanal: <#${klon.id}> (Yeniden oluşturuldu!)\nSilen Kişi: ${member.user}`
            )
            .setColor("RED")
            .setAuthor(member.user.tag, member.user.displayAvatarURL);
          channel.guild.owner.send(embed);
        }
        await klon.setParent(channel.parent);
        await klon.setPosition(channel.position);
      });
  }
});
client.on("channelCreate", async (channel, message) => {
  let kanalkoruma = await db.fetch(`kanalk_${channel.guild.id}`);
  if (kanalkoruma == "acik") {
    if (!channel.guild.me.hasPermission("MANAGE_CHANNELS")) return;
    let guild = channel.guild;
    const logs = await channel.guild.fetchAuditLogs({ type: "CHANNEL_CREATE" });
    let member = channel.members.get(logs.entries.first().executor.id);
    if (!member) return;
    if (member.hasPermission("ADMINISTRATOR")) return;
    channel.delete();
    const embed = new Discord.MessageEmbed().setDescription(
      `Sunucunuzda kanal oluşturuldu ama silindi! (Kanal Koruma Sistemi)`
    );
    channel.guild.owner.send(embed);
  }
});
client.on("channelUptade", async (channel, message) => {
  let kanalkoruma = await db.fetch(`kanalk_${channel.guild.id}`);
  if (kanalkoruma == "acik") {
    if (!channel.guild.me.hasPermission("MANAGE_CHANNELS")) return;
    let guild = channel.guild;
    const logs = await channel.guild.fetchAuditLogs({ type: "CHANNEL_UPTADE" });
    let member = channel.members.get(logs.entries.first().executor.id);
    if (!member) return;
    if (member.hasPermission("ADMINISTRATOR")) return;
    channel.old();
    const embed = new Discord.MessageEmbed().setDescription(
      `Sunucunuzda kanal adı/rol izinleri/webhook güncellendi ama herşeyi eski haline getirdim! (Kanal Koruma Sistemi)`
    );
    channel.guild.owner.send(embed);
  }
});
// ---------------> [Emoji-Koruma] <------------------- \\
client.on("emojiDelete", async function(emoji, kisi, user, yetkili) {
  const i = await db.fetch(`emojikoruma_${emoji.guild.id}`, true);
  if (i) {
    const entry = await emoji.guild
      .fetchAuditLogs({ type: "EMOJİ_DELETE" })
      .then(audit => audit.entries.first());

    let kisi = emoji.guild.member(entry.executor);
    kisi.roles
      .filter(a => a.hasPermission("ADMINISTRATOR"))
      .forEach(x => kisi.roles.remove(x.id));
    kisi.roles
      .filter(a => a.hasPermission("MANAGE_CHANNELS"))
      .forEach(x => kisi.roles.remove(x.id));
    kisi.roles
      .filter(a => a.hasPermission("MANAGE_ROLES"))
      .forEach(x => kisi.roles.remove(x.id));
    kisi.mute();

    const deleter = emoji.executor;
    const id = emoji.executor.id;

    if (id === client.user.id || id === emoji.guild.ownerID) return;

    emoji.guild.members.forEach(async function(members) {
      if (members.id !== id) return;
      members.roles.forEach(role => {
        if (role.hasPermission(8) || role.hasPermission("MANAGE_EMOJIS")) {
          members.roles.remove(role.id);
emoji.guild.owner.send(`**<@${yetkili.id}> İsimli yetkili <@${user.id}>** adlı kişi **${emoji.guild.name}** adlı sunucunuzda emoji sildi ve yetkileri alındı!`)}})})}});

client.login(ayarlar.token);