"use strict";

var _ = require("lodash");
const Helper = require("../../helper");

exports.commands = ["quit"];
exports.allowDisconnected = true;

exports.input = function(network, chan, cmd, args) {
	var client = this;

	client.networks = _.without(client.networks, network);
	network.destroy();
	client.save();
	client.emit("quit", {
		network: network.id
	});

	if (network.irc) {
		const quitMessage = args[0] ? args.join(" ") : Helper.config.leaveMessage;
		network.irc.quit(quitMessage);
	}

	return true;
};
