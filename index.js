
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


 bot.on('ready', async() => {
   console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(`On SkyGamingCell Videos `);
});



bot.on("message",async message =>{
const logsCommands = bot.channels.get(botconfig.logsChannelID);
const logsCommands2 = bot.channels.get(botconfig.logsChannelID2);

  if(message.channel.type == "dm") {
    console.log(`${message.author.tag} שלח לי הודעה פרטית!`);
    return logsCommands.send(`${message.author.tag} שלח לי הודעה פרטית!`);
}

 let prefix = process.env.BOT_PREFIX;
 let messageArray = message.content.split(" ");
 let cmd = messageArray[0];
 let args = messageArray.slice(1);

 //------------------------------------------^^ DONT TOUCH HERE ^^------------------------------------------
 
 //kick command
 if(cmd === `${prefix}kick`){
   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!kUser) return message.channel.send("Can't find user!");
   let kReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!")
   if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
let kickEmbed = new Discord.RichEmbed()
.setDescription("~kick~")
.setColor("#42f4e8")
.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
.addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Kicked In", message.channel)
.addField("Time", message.createdAt)
.addField("Reason", kReason);
message.delete().catch(O_o=>{});

let kickChannel = message.guild.channels.find(`name`, "incidents")
if(!kickChannel) return message.channel.send("Can't find incidents channel")

message.guild.member(kUser).kick(kReason);
kickChannel.send(kickEmbed)

console.log(`${message.author.tag} Ask for help from the bot`);
    return logsCommands.send(`${message.author.tag} Ask help from the bot`);

   return;
 }

 
 //report command
if(cmd === `${prefix}report`){

let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!rUser) return message.channel.send("Couldn't find user.");
let reason = args.join(" ").slice(22);

let reportEmbed =  new Discord.RichEmbed()
.setDescription("Reports")
.setColor("#4286f4")
.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
.addField("Channel", message.channel)
.addField("Time", message.createdAt)
.addField("Reason", reason);


let reportschannel = message.guild.channels.find(`name`,"reports");
if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


message.delete().catch(O_o=>{});
reportschannel.send(reportEmbed)

  return;
}

 //ban command
if(cmd === `${prefix}ban`){

let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!bUser) return message.channel.send("Can't find user!");
let bReason = args.join(" ").slice(22);
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!")
if(bUser.hasPermission("MANAGE_MEMBERS")) return message.channel.send("That person can't be kicked!");

let banEmbed = new Discord.RichEmbed()
.setDescription("~Ban~")
.setColor("#5443ef")
.addField("Banned User", `${bUser} with ID ${bUser.id}`)
.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Banned In", message.channel)
.addField("Time", message.createdAT)
.addField("Reason", bReason);

let incidentChannel = message.guild.channels.find(`name`, "incidents")
if(!incidentChannel) return message.channel.send("Can't find incidents channel")

message.delete().catch(O_o=>{});


message.guild.member(bUser).ban(bReason);
incidentchannel.send(banEmbed);
}

 //server info
if(cmd === `${prefix}serverinfo`){
     let sicon = message.guild.iconURL;
     let serverembed = new Discord.RichEmbed()
     .setDescription("Server Information")
     .setColor("#75aaff")
     .setThumbnail(sicon)
     .addField("Server Name", message.guild.name)
     .addField("createdAt", message.guild.createdAt)
     .addField("Join Date", message.member.joinedAt)
     .addField("Member Count", message.guild.memberCount);

     return message.channel.send(serverembed);
   }

 
 
 //קללה מגניבה
   if(message.content == 'לך תזדיין'){

     message.delete().catch(O_o=>{});
     console.log(`${message.author.tag} השתמש במילה לך תזדיין, מגיע אזהרה או העפה, תלוי במקרה.`);
     return logsCommands.send(`${message.author.tag}  השתמש במילה לך תזדיין, מגיע אזהרה או העפה, תלוי במקרה.`);
   }

 if(message.content == 'shop'){

  message.channel.sendMessage('https://shoppy.gg/@SkyGamingCell');
}
 
 //bot info command
if(cmd === `${prefix}botinfo`){

let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()
.setDescription("Bot Information")
.setColor("#4286f4")
.setThumbnail(bicon)
.addField("Bot Name", bot.user.username)
.addField("Created On", bot.user.createdAt)
.addField("Created By", "<@461151799924228108>");


return message.channel.send(botembed);
 }

 
 if(message.content == 'נענע'){

  message.channel.sendMessage('נע נע נע נע נע נעעעעעע  ' + ' תתנין');
}
 
 if(message.content == 'MiddleMan'){

  message.channel.sendMessage('@Middle Man');
}
 
 //stw help
 if(cmd === `${prefix}MiddleMan`){

 let botembed = new Discord.RichEmbed()
 .setDescription("Call For Middle Man")
 .setColor("random")
  .addField("Middle Man", "@Middle Man") 
 return message.channel.send(botembed);
}

if(cmd === `${prefix}prefix`){

message.channel.sendMessage("!")
}



});

bot.login(process.env.BOT_TOKEN);
