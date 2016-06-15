
TrelloAccess = function(gridContainer) {
	this.init()
	this.requestCards()
	this.$gridContainer = gridContainer
}

TrelloAccess.prototype.init = function() {
	this.apiUrl = this.apiUrl
	this.listRequestUrl = 'lists/'+this.listId+'/cards/'
}

TrelloAccess.prototype.apiUrl = 'https://api.trello.com/1/'
TrelloAccess.prototype.listId = '576104f89ac9fe0f45a032fb'
TrelloAccess.prototype.cards = ''


TrelloAccess.prototype.requestCards = function() {
	var requestUrl = this.apiUrl+this.listRequestUrl

    var self = this
    jQuery.ajax({
        type      :  'get',
        dataType  :  'json',
        url       :  requestUrl,
        success   :  function(data) {
            self.setCards(data)
            self.parseCardData()
        }
    })

}

TrelloAccess.prototype.setCards = function(cardData) {
	this.cardData = cardData
}

TrelloAccess.prototype.parseCardData = function() {
	var self = this
	var length = this.cardData.length

	$(this.cardData).each( function(index,data){
		var card = {};
		card.labels = []

		card.title = this.name
		card.desc = this.desc
		card.teaser = this.desc.split(/\n/)[0]
		card.dueDate = this.due
		console.log(card.dueDate)

		$(this.labels).each( function() {
			card.labels.push(this.name) 	
		})

		var last = false

		if(index === length -1) {
			last = true
		}

		self.requestAttachments(card,this,last)



	})

}

TrelloAccess.prototype.requestAttachments = function(card,cardData,last) {
	var self = this
	var value
	var requestUrl = this.apiUrl+'cards/'+cardData.id+'/attachments'
	var lastOfSet = last

	jQuery.ajax({
		type: 'get',
		async: 'false',
		dataType: 'json',
		url: requestUrl,
		success: function(data) {
			$(data).each( function() {
				if (this.name == 'agentur_logo.png') {
					card.logo = this.url
				}
			})

			self.parseTemplate(card);
			if (lastOfSet) {
				startIsotope()
			}
		}
	})

}

TrelloAccess.prototype.parseTemplate = function(card) {
	var source   = openTemplate
	var template = Handlebars.compile(source);

	var html = template(card)

	this.$gridContainer.append(html);
}


jQuery(document).ready( function() {
	trelloAccess = new TrelloAccess($('.grid'));
})
