const Discord = require('discord.js');
const fetch = require("node-fetch");
const client = new Discord.Client();
const randomPuppy = require("random-puppy");
const ytdl = require("ytdl-core");
const YouTube = require('simple-youtube-api');
var queue = new Map();

const ms = require("ms");

const bot = new Discord.Client();
const prefix = "d!"

const youtube = new YouTube("AIzaSyAzLytewTLXeFnOSGPe1vMW8GrgZb_6JrU");

let { welcomeChannel } = require('./channel.json')
let { goodbyeChannel } = require('./channel.json')
let { logsChannel } = require('./channel.json')

client.once("ready", () => {
	console.log("I am online!");
});

client.login(process.env.token);


client.on("ready", () => {
	client.user.setActivity('d!help' , { type: 'STREAMING'})
})

client.on("message", async message => {
	const bot = new Discord.Client();
	if(message.author.bot) return;

	// HELP COMMANDS

	if(message.content === (prefix + "help")) {
		const helpembed = new Discord.MessageEmbed()
		.setTitle("HELP MENU")
		.addField(":smile: **FUN**", "d!say \n d!quiz \n d!8ball (question) \n d!randomnumber \n d!stats \n d!howcoolis (@user) \n d!react (message) \n d!meme \n d!cute \n d!cat \n d!dog \n d!funny")
		.addField(":hammer: **MODERATION**", "d!kick (user) (reason) \n d!ban (user) (reason)")
		.addField(":scroll: **INFO**", "d!help \n d!poll (question) \n d!version \n d!discord \n d!creator \n d!invitelink \n d!ping")
		.addField(":e_mail: **Setup**", "d!welcomechannelsetup #(channel) \n d!goodbyechannelsetup #(channel) \n d!greetings support \n d!logschannelsetup #(channel)")
		.addField("🎵 **MUSIC**", "d!play (youtube url) \n d!skip \n d!stop \n d!np \n d!pause \n d!resume \n d!queue \n ❗ **WARNING** ❗ Dindi Bot is currently running on a free host Heroku so it has a limited Rate Limit, sometimes we are out of Rate Limit and music wont work, if thats the case wait 5-20 minutes to use music commands again!")
		.addField("**Dindi Bot needs the following permissions for all the commands to work properly:**", "Read Messages \n Send Messages \n Embed Links \n Manage Messages \n Add Reactions \n Read Message History \n Ban Members \n Kick Members")
		.addField("***Don't forget to support the development of Dindi Bot by voting for it on the following website:***", "https://top.gg/bot/722395531971657738")
		message.member.send(helpembed).catch(error =>{
			message.channel.send("I can't DM you, please use d!helpinchannel instead.")
			return;
		});
		message.channel.send("Help menu sent!")
	}

	if(message.content === (prefix + "helpinchannel")) {
		const helpembed = new Discord.MessageEmbed()
		.setTitle("HELP MENU")
		.addField(":smile: **FUN**", "d!say \n d!quiz \n d!8ball (question) \n d!randomnumber \n d!howcoolami \n d!howcoolis (@user) \n d!react (message) \n d!meme \n d!cute \n d!cat \n d!dog \n d!funny")
		.addField(":hammer: **MODERATION**", "d!kick (user) (reason) \n d!ban (user) (reason)")
		.addField(":scroll: **INFO**", "d!help \n d!poll (question) \n d!version \n d!discord \n d!creator \n d!invitelink \n d!ping")
		.addField(":e_mail: **Setup**", "d!welcomechannelsetup #(channel) \n d!goodbyechannelsetup #(channel) \n d!greetings support \n d!logschannelsetup #(channel)")
		.addField("🎵 **MUSIC**", "d!play (youtube url) \n d!skip \n d!stop \n d!np \n d!pause \n d!resume \n d!queue \n ❗ **WARNING** ❗ Dindi Bot is currently running on a free host Heroku so it has a limited Rate Limit, sometimes we are out of Rate Limit and music wont work, if thats the case wait 5-20 minutes to use music commands again!")
		.addField("**Dindi Bot needs the following permissions for all the commands to work properly:**", "Read Messages \n Send Messages \n Embed Links \n Manage Messages \n Add Reactions \n Read Message History \n Ban Members \n Kick Members")
		.addField("***Don't forget to support the development of Dindi Bot by voting for it on the following website:***", "https://top.gg/bot/722395531971657738")
		message.channel.send(helpembed).catch(error =>{
			message.channel.send("I need the Embed Links permission to do this.")
		});
	}

	// CONVERSATION COMMANDS

	if(message.content === "Hi") {
		message.channel.send("Yo, hi!");
	}

	if(message.content === "How are you?") {
		message.channel.send("Im very electronic, hbu?");
	}

	if(message.content === "Im good" || message.content === "Im awesome" || message.content === "Im great") {
		message.channel.send(":O Thats great!");
	}

	if(message.content === "Im bad" || message.content === "Im sad" || message.content === "Im auful") {
		message.channel.send("Oh no! Now im sad :crying_cat_face:");
	}

	// INFORMATION COMMANDS
	if(message.content === (prefix + "creator")) {
		message.channel.send("This bot is made by **Dindi**, you can visit his youtube channel on https://www.youtube.com/channel/UCjqnUsIVtXHGyCd3q_qvqYQ");
	}

	if(message.content === (prefix + "support")) {
		message.channel.send("You can visit the official Dindi Bot disord server on https://discord.gg/NddGpqR");
	}

	if(message.content === (prefix + "greetings support")){
		message.channel.send("**These are the following problems that could be blocking Dindi Bot from sending welcome and goodbye messages:** \n \n \n **The bot doesn't have the permission to send or view messages in the 👋-welcome-goodbye channel** \n in this case you need to go to the channels permission settings and enable the following permissions for the Dindi Bot role: **Read Messages** and **Send Messages** \n \n **The bot got a new update and the channels reset** \n In this case you just need to reset the welcome/goodbye channel with d!welcomechannelsetup and d!goodbyechannelsetup commands \n \n If you everything on the list and the bot still isn't working type d!discord and join the Dindi Bot discord support server, you will get direct help from there.");
	}

	if(message.content === (prefix + "version")) {
		message.channel.send("The current version is **0.2.2**");
	}

	if(message.content === (prefix + "invite")) {
		message.channel.send("You can invite Dindi Bot to your own server via the following link: \n https://discord.com/oauth2/authorize?client_id=722395531971657738&scope=bot&permissions=2146958847");
	}

	if(message.content == (prefix + "ping")){
		const msg = await message.channel.send("Pinging...");
		const latency = msg.createdTimestamp - message.createdTimestamp;
		msg.edit(`My current latency is ${latency}ms`);
	}

	// POLLS
	if(message.content.startsWith(prefix + "poll")){
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This command requires the permission: **Manage Messages**");
		var pollargs = message.content.split(" ").slice(1).join(" ");
		if(!pollargs[0]) return message.channel.send("Proper Usage: d!poll (question)");
		const pollembed = new Discord.MessageEmbed()
		.setTitle(`Poll by ${message.author.username}`)
		.setThumbnail(`${message.author.displayAvatarURL()}`)
		.addField(`Question:`, `${pollargs}`)
		.setFooter("React to vote!")
		const pollmsg = await message.channel.send(pollembed).catch(error =>{
			message.channel.send("I need the Embed Links permission to do this.")
			return;
		});
		pollmsg.react("👍");
		pollmsg.react("👎");
		message.delete();

	}


	// FUN COMMANDS

	// MUSIC
	const serverQueue = queue.get(message.guild.id);
	if(message.content.startsWith(`${prefix}play`)){
		const musicargs = message.content.substring(prefix.length).split(" ");
		const searchString = musicargs.slice(1).join(" ");
		const url = args[1] ? args[1].replace(/<(.+)>/g, '$1'):""
		const voiceChannel = message.member.voice.channel;
		if(!musicargs) return message.channel.send("Please give me a valid youtube link!");
		if(!voiceChannel) return message.channel.send("You need to enter a voice channel!");
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) return message.channel.send("I need permission to speak and connect to that channel!");

		try {
			var video = await youtube.getVideoByID(url);
		} catch {
			try {
				var videos = await youtube.searchVideos(searchString, 1);
				var video = await youtube.getVideoByID(videos[0].id);
			} catch {
				message.channel.send("I couldn't find any search results!")
			}
		}

		
		const song = {
			id: video.id,
			title: Discord.Util.escapeMarkdown(video.title),
			url: `https://www.youtube.com/watch?v=${video.id}`
		}
		
		if(!serverQueue){
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true
			}
			queue.set(message.guild.id, queueConstruct);

			queueConstruct.songs.push(song);

			try {
				var connection = await voiceChannel.join();
				queueConstruct.connection = connection;
				play(message.guild, queueConstruct.songs[0])
			} catch (error) {
				console.log("There was an error connecting to this channel: " + error);
				queue.delete(message.guild.id);
				return message.channel.send("There was an error connecting to this voice channel!");
			}
		} else {
			serverQueue.songs.push(song);
			return message.channel.send(`**${song.title}** has been added to the queue!`);
		}
		return undefined;

	} else if(message.content.startsWith(`${prefix}stop`)){
		if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel!");
		if(!serverQueue) return message.channel.send("There are no songs to stop!");
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
		message.channel.send("Music stopped!");
		return undefined;
	} else if(message.content.startsWith(`${prefix}skip`)){
		if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel!");
		if(!serverQueue) return message.channel.send("There are no songs to skip!");
		serverQueue.connection.dispatcher.end();
		message.channel.send("Song skipped!");
		return undefined;
	} else if(message.content.startsWith(`${prefix}np`)){
		if(!serverQueue) return message.channel.send("There is nothing playing!");
		message.channel.send(`Now playing: **${serverQueue.songs[0].title}**`);
		return undefined;
	} else if(message.content.startsWith(`${prefix}queue`)){
		if(!serverQueue) return message.channel.send("There is nothing playing!");
		message.channel.send(`
		__**Song Queue:**__
		${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

		**Now Playing:** ${serverQueue.songs[0].title}
		`, { split: true });
		return undefined;
	} else if (message.content.startsWith(`${prefix}pause`)){
		if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel!");
		if(!serverQueue) return message.channel.send("There is nothing to pause!");
		if(!serverQueue.playing) return message.channel.send("Music is already paused!");
		serverQueue.playing = false;
		serverQueue.connection.dispatcher.pause();
		message.channel.send("Music paused!");
		return undefined;
	}else if (message.content.startsWith(`${prefix}resume`)){
		if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel!");
		if(!serverQueue) return message.channel.send("There is nothing to resume!");
		if(serverQueue.playing) return message.channel.send("Music is already playing!");
		serverQueue.playing = true;
		serverQueue.connection.dispatcher.resume();
		message.channel.send("Music resumed!");
		return undefined;
	}

	// QUIZ
	if(message.content === (prefix + "quiz")){
		message.channel.send("In the process of making...")
	}

	if(message.content === (prefix + "stats")){
		coolness = (Math.floor(Math.random() * 100 + 1));
		smartness = (Math.floor(Math.random() * 100 + 1));
		logic = (Math.floor(Math.random() * 100 + 1));
		dumbness = (Math.floor(Math.random() * 100 + 1));
		looks = (Math.floor(Math.random() * 100 + 1));
		var favnumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
		favnumber = favnumbers[Math.floor(Math.random() * favnumbers.length)-1];
		var ppsizes= ["8=D", "8==D", "8===D", "8====D", "8=====D", "8======D", "8=======D", "8========D", "8=========D", "8==========D"]
		ppsize = ppsizes[Math.floor(Math.random() * ppsizes.length)-1];
		const statsembed = new Discord.MessageEmbed()
		.setTitle(`Stats for ${message.author.username}`)
		.setThumbnail(`${message.author.displayAvatarURL()}`)
		.addField("Coolness:", `${coolness}%`)
		.addField("Smartness:", `${smartness}%`)
		.addField("Logic:", `${logic}%`)
		.addField("Dumbness:", `${dumbness}%`)
		.addField("Favorite Number:", favnumber)
		.addField("PP Size:", ppsize)
		message.channel.send(statsembed).catch(error =>{
			message.channel.send("I need the Embed Links permission to do this.")
		});
	}

	if(message.content.startsWith(prefix + "meme")){
		const subReddits = ["meme", "dankmeme", "me_irl"];
		const randomSubreddit = subReddits[Math.floor(Math.random() * subReddits.length)];
		const memeImg = await randomPuppy(randomSubreddit);
		const memeEmbed = new Discord.MessageEmbed()
		.setTitle(`From /r/${randomSubreddit}`)
		.setURL(`http://reddit.com/${randomSubreddit}`)
		.setImage(memeImg)

		message.channel.send(memeEmbed).catch(error =>{
			message.channel.send("I need the Embed Links permission to do this.")
		});
	}

	if(message.content.startsWith(prefix + "cute")){
		const subReddits = ["cute", "puppy"];
		const randomSubreddit = subReddits[Math.floor(Math.random() * subReddits.length)];
		const cuteImg = await randomPuppy(randomSubreddit);
		const cuteEmbed = new Discord.MessageEmbed()
		.setTitle(`From /r/${randomSubreddit}`)
		.setURL(`http://reddit.com/${randomSubreddit}`)
		.setImage(cuteImg)

		message.channel.send(cuteEmbed).catch(error =>{
			message.channel.send("I need the Embed Links permission to do this.")
		});
	}

	if(message.content.startsWith(prefix + "dog")){
		const subReddits = ["DOG", "dogswithjobs"];
		const randomSubreddit = subReddits[Math.floor(Math.random() * subReddits.length)];
		const dogImg = await randomPuppy(randomSubreddit);
		const dogEmbed = new Discord.MessageEmbed()
		.setTitle(`From /r/${randomSubreddit}`)
		.setURL(`http://reddit.com/${randomSubreddit}`)
		.setImage(dogImg)

		message.channel.send(dogEmbed).catch(error =>{
			message.channel.send("I need the Embed Links permission to do this.")
		});
	}

	if(message.content.startsWith(prefix + "cat")){
		const subReddits = ["cat", "cats"];
		const randomSubreddit = subReddits[Math.floor(Math.random() * subReddits.length)];
		const catImg = await randomPuppy(randomSubreddit);
		const catEmbed = new Discord.MessageEmbed()
		.setTitle(`From /r/${randomSubreddit}`)
		.setURL(`http://reddit.com/${randomSubreddit}`)
		.setImage(catImg)

		message.channel.send(catEmbed).catch(error =>{
			message.channel.send("I need the Embed Links permission to do this.")
		});
	}

	if(message.content.startsWith(prefix + "funny")){
		const subReddits = ["funny"];
		const randomSubreddit = subReddits[Math.floor(Math.random() * subReddits.length)];
		const funnyImg = await randomPuppy(randomSubreddit);
		const funnyEmbed = new Discord.MessageEmbed()
		.setTitle(`From /r/${randomSubreddit}`)
		.setURL(`http://reddit.com/${randomSubreddit}`)
		.setImage(funnyImg)

		message.channel.send(funnyEmbed).catch(error =>{
			message.channel.send("I need the Embed Links permission to do this.")
		});
	}

	if(message.content === (prefix + "randomnumber")) {
		message.channel.send(Math.floor(Math.random() * 1000000 + 1));
	}

	if(message.content.startsWith(prefix + "howcoolis")) {
		coolness = (Math.floor(Math.random() * 100 + 1));
		message.channel.send("They are " + coolness + "% cool");
	}

	if(message.content.startsWith(prefix + "react")){
		var reactions = ["😄", "😎", "🤡", "😂", "👍", "👎", "😢", "👏", "⭐", "🤦‍♂️"];
		var reaction = reactions[Math.floor(Math.random() * reactions.length)-1];
		message.react(reaction);
	}

	// 8ball
	if(message.content.startsWith(prefix + "8ball")){
		var ListAnswers = ["Yes", "No", "Maybe", "I don't know", "Cool", "Maybe yes", "Maybe no", "Probably", "Probably not", "Ask again later"];
		var answer = ListAnswers[Math.floor(Math.random() * ListAnswers.length)-1];
		var arguments = message.content.split(" ").slice(1).join(" ");
		if(!arguments)return message.reply("Specify your question.");
		const ballembed = new Discord.MessageEmbed()
		.setTitle("8Ball")
		.addField("Your question: ", arguments)
		.addField("My answer: ", answer)
		message.channel.send(ballembed).catch(error =>{
			message.channel.send("I need the Embed Links permission to do this.")
		});
	}

	// Say Command
	if(message.content.startsWith(`${prefix}say`)){
		if(!message.member.hasPermission('MANAGE_MESSAGES')){
			message.channel.send("You do not have the Manage Messages permission!")
			return;
		}
		const sayargs = message.content.split(" ").slice(1).join(" ")
		message.channel.send(sayargs);
	}

	// WELCOME & GOODBYE SETUP

	if(message.content.startsWith(`${prefix}welcomechannelsetup`))
	{
		if(!message.member.hasPermission(['MANAGE_CHANNELS']))return message.channel.send("You do not have the Manage Channels permission!");

		let numberOfLine =    message.content.slice(prefix.lenght).split(" ");
		let args = numberOfLine.slice(1);

		let channelSet = args[0].replace("<#", "");
		channelSet = channelSet.replace(">", "");
		welcomeChannel = channelSet;
		
		message.channel.send("#"+welcomeChannel + " now set as the welcome channel! If the bot isn't sending welcome messages do d!greetings support.");
	}

	if(message.content.startsWith(`${prefix}goodbyechannelsetup`))
	{
		if(!message.member.hasPermission(['MANAGE_CHANNELS'])){
			message.channel.send("You do not have the Manage Channels permission!");
			return;
		}
		let numberOfLine =    message.content.slice(prefix.lenght).split(" ");
		let args = numberOfLine.slice(1);

		let channelSet2 = args[0].replace("<#", "");
		channelSet2 = channelSet2.replace(">", "");
		goodbyeChannel = channelSet2;
		
		message.channel.send("#"+goodbyeChannel + " now set as the goodbye channel! If the bot isn't sending goodbye messages do d!greetings support.");
	}

	// LOGS CHANNEL SETUP
	if(message.content.startsWith(`${prefix}logschannelsetup`))
	{
		if(!message.member.hasPermission(['MANAGE_CHANNELS']))return message.channel.send("You do not have the Manage Channels permission!");

		let numberOfLine =    message.content.slice(prefix.lenght).split(" ");
		let args = numberOfLine.slice(1);

		let channelSet3 = args[0].replace("<#", "");
		channelSet3 = channelSet3.replace(">", "");
		logsChannel = channelSet3;
		
		message.channel.send("#"+logsChannel + " now set as the logs channel! If the bot isn't sending log messages do d!greetings support.");
	}

	// BAN/KICK
	mention = message.mentions.users.first();

	if(message.content.startsWith (prefix + "ban")){
		if(!message.member.hasPermission("BAN_MEMBERS")){
			message.channel.send("You do not have the BAN_MEMBERS permission!")
			return;
		}
		if(mention == null){
			message.channel.send("You need to mention the member you want to ban!")
			return;
		}
		if(message.guild.member(mention).hasPermission("ADMINISTRATOR")){
			message.channel.send("You cannot ban this person.")
			return;
		}
		let reason = message.content.slice (prefix.length + mention.toString().length + 5);
		message.guild.member(mention).ban(reason).catch(error =>{
			message.channel.send("I need the Ban Members permission to do this.")
			return;
		});
		message.channel.send(mention.username + " has been banned :hammer: for " + reason);
		const logchannel = message.guild.channels.cache.find(channel => channel.id === logsChannel);
		if(!logchannel) return;
		logchannel.send(mention.username + " has been banned for " + reason);
	}

	if(message.content.startsWith (prefix + "kick")){
		if(!message.member.hasPermission("KICK_MEMBERS")){
			message.channel.send("You do not have the KICK_MEMBERS permission!")
			return;
		}
		if(mention == null){
			message.channel.send("You need to mention the member you want to kick!")
			return;
		}
		if(message.guild.member(mention).hasPermission("ADMINISTRATOR")){
			message.channel.send("You cannot kick this person.")
			return;
		}
		let reason = message.content.slice (prefix.length + mention.toString().length + 5);
		message.guild.member(mention).kick(reason).catch(error =>{
			message.channel.send("I need the Kick Members permission to do this.")
			return;
		});
		message.channel.send(mention.username + " has been kicked :hammer: for " + reason);
		const logchannel = message.guild.channels.cache.find(channel => channel.id === logsChannel);
		if(!logchannel) return;
		logchannel.send(mention.username + " has been kicked for " + reason);
	}

	// BAD WORDS
	if(message.content.includes("nigga") || message.content.includes("niggar") || message.content.includes("ni gga") || message.content.includes("ni ggar") || message.content.includes("Nigga") || message.content.includes("Niggar")){
		message.delete().catch(error =>{
			message.channel.send("I need the Manage Messages permission to stop racist messages.")
			return;
		});
		message.channel.send("Hey! Watch your language you racist 😠");
	}
});

client.on("guildMemberAdd", member => {
	const channel = member.guild.channels.cache.find(channel => channel.id === welcomeChannel);
	if(!channel) return;

	channel.send(`${member} just joined! Give them a warm welcome :wave:`).catch(error =>{
		return;
	});
});

client.on("guildMemberRemove", member => {
	const channel = member.guild.channels.cache.find(channel => channel.id === goodbyeChannel);
	if(!channel) return;

	channel.send(`${member} just left :cry:`).catch(error =>{
		return;
	});
});


function play(guild, song){
	const serverQueue = queue.get(guild.id);


	if(!song){
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.play(ytdl(song.url))
	.on('finish', () => {
		serverQueue.songs.shift();
		play(guild, serverQueue.songs[0]);
	})	
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	serverQueue.textChannel.send(`Now playing **${song.title}**`);
}