const Discord = require('discord.js');
const client = new Discord.Client();


client.once("ready", () => {
	console.log("I am online!");
});

client.login(process.env.token);


client.on("ready", () => {
	client.user.setActivity('d!help' , { type: 'STREAMING'})
})

client.on("message", async message => {

	// EASTER EGG/MAIN COMMANDS

	if(message.content === "ping") {
		message.channel.send("Pong!");
	}

	if(message.content === "d!help") {
		const helpembed = new Discord.MessageEmbed()
		.setTitle("HELP MENU")
		.addField(":smile: **FUN**", "d!say \n d!8ball (question) \n d!randomnumber \n d!howcoolami \n d!react (message)")
		.addField(":hammer: **MODERATION**", "d!kick (user) (reason) \n d!ban (user) (reason)")
		.addField(":scroll: **INFO**", "d!help \n d!poll (question) \n d!version \n d!discord \n d!creator \n d!invitelink")
		.addField(":wave: **WELCOME & GOODBYE**", "d!join leave setup")
		message.member.send(helpembed);
		message.channel.send("Help menu sent! If you don't get a DM with it try to type d!helpinchannel to show the help menu in your current channel!")
	}

	if(message.content === "d!helpinchannel") {
		const helpembed = new Discord.MessageEmbed()
		.setTitle("HELP MENU")
		.addField(":smile: **FUN**", "d!say \n d!8ball (question) \n d!randomnumber \n d!howcoolami \n d!react (message)")
		.addField(":hammer: **MODERATION**", "d!kick (user) (reason) \n d!ban (user) (reason)")
		.addField(":scroll: **INFO**", "d!help \n d!poll (question) \n d!version \n d!discord \n d!creator \n d!invitelink")
		.addField(":wave: **WELCOME & GOODBYE**", "d!join leave setup")
		message.channel.send(helpembed);
	}

	if(message.content === "d!nuke") {
		message.channel.send("LOL YOU THOUGHT, banned l o l");
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

	if(message.content === "d!creator") {
		message.channel.send("This bot is made by **Dindi**, you can visit his youtube channel on https://www.youtube.com/channel/UCjqnUsIVtXHGyCd3q_qvqYQ");
	}

	if(message.content === "d!discord") {
		message.channel.send("You can visit the official Dindi Bot disord server on https://discord.gg/NddGpqR");
	}

	if(message.content === "d!join leave setup") {
		message.channel.send("Please create a new channel under the name welcome-goodbye, when you are done the bot will automaticly be sending welcome and goodbye messages to that channel. If it doesn't, check if the channel name is correct!");

	}

	if(message.content === "d!version") {
		message.channel.send("The current version is **0.1.4**");
	}

	if(message.content === "d!invitelink") {
		message.member.send("You can invite Dindi Bot to your own server via the following link: \n https://discord.com/oauth2/authorize?client_id=722395531971657738&scope=bot&permissions=2146958847");
	}

	// FUN COMMANDS

	if(message.content === "d!randomnumber") {
		message.channel.send(Math.floor(Math.random() * 1000000 + 1));
	}

	if(message.content === "d!howcoolami") {
		coolness = (Math.floor(Math.random() * 100 + 1));
		message.channel.send("You are " + coolness + "% cool");
	}

	if(message.content.startsWith("d!react")){
		var reactions = ["😄", "😎", "🤡", "😂", "👍", "👎", "😢", "👏", "⭐", "🤦‍♂️"];
		var reaction = reactions[Math.floor(Math.random() * reactions.length)-1];
		message.react(reaction);
	}

	// 8ball
	if(message.content.startsWith("d!8ball")){
		var ListAnswers = ["Yes", "No", "Maybe", "I don't know", "Cool", "Maybe yes", "Maybe no", "Probably", "Probably not", "Ask again later"];
		var answer = ListAnswers[Math.floor(Math.random() * ListAnswers.length)-1];
		var arguments = message.content.split(" ").slice(1).join(" ");
		if(!arguments)return message.reply("Specify your question.");
		const ballembed = new Discord.MessageEmbed()
		.setTitle("8Ball")
		.addField("Your question: ", arguments)
		.addField("My answer: ", answer)
		message.channel.send(ballembed);
	}

	// Say Command
	const sayPrefix = "d!say";
	const PREFIX = "d!";
	const args = message.content.substring(PREFIX.length).split(" ");
	const args2 = message.content.slice(sayPrefix.length).trim().split();
	if(args.content === "@everyone" || args.content === "@here"){
		return;
	}
	if(message.author.bot){
		return;
	}

	switch(args[0]) {
	case "say":
		if(!message.client.bot) {
			message.channel.send(args2);
		}

		message.delete();
		break;


	}


	// BAN/KICK
	mention = message.mentions.users.first();

	if(message.content.startsWith (PREFIX + "ban")){
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
		let reason = message.content.slice (PREFIX.length + mention.toString().length + 5);
		message.channel.send(mention.username + " has been banned :hammer: for " + reason);
			message.guild.member(mention).ban(reason);
	}

	if(message.content.startsWith (PREFIX + "kick")){
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
		let reason = message.content.slice (PREFIX.length + mention.toString().length + 5);
		message.channel.send(mention.username + " has been kicked :hammer: for " + reason);
		message.guild.member(mention).kick(reason);
	}

	// POLLS
	if(message.content.startsWith("d!poll")) {
		message.channel.send("Poll command coming soon...")
	}
});

client.on("guildMemberAdd", member => {
	// eslint-disable-next-line no-shadow
	const channel = member.guild.channels.cache.find(channel => channel.name === "welcome-goodbye");
	if(!channel) return;

	channel.send(`${member} just joined! Give them a warm welcome :wave:`);
});

client.on("guildMemberRemove", member => {
	// eslint-disable-next-line no-shadow
	const channel = member.guild.channels.cache.find(channel => channel.name === "welcome-goodbye");
	if(!channel) return;

	channel.send(`${member} just left :cry:`);
});
