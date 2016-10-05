(function(window){
    //I recommend this
    'use strict';

    function define_trelloAccess(){

    	//var assignedTemplate = '<div class="task grid-item col-md-3 assigned"><div class="task-info"><div class="task-category{{#each labels}} category-{{this}}{{/each}}"></div><p class="task-title">{{title}}</p><p class="small task-due-date">{{dueDate}}</p></div><div class="agency"><p class="small">This Task is assigned to:</p><img src="{{logo}}" class="task-agency-logo"><p class="task-agency-name">{{agencyName}}</p></div></div>'
		//var openTemplate = '<div class="task grid-item col-md-3"><div class="task-info"><div class="task-category{{#each labels}} category-{{this}}{{/each}}"></div><p class="task-title">{{title}}</p><p class="task-description">{{teaser}}</p><p class="small task-due-date">{{dueDate}}</p></div><a href="" target="_blank" class="btn typo3">More Info</a></div>'
        
        var TrelloAccess = {};
        var apiUrl = 'https://api.trello.com/1/'

        TrelloAccess.greet = function(status){
    	}

    	TrelloAccess.bye = function() {
    		alert("Bye from TrelloAccess")
    	}

    	TrelloAccess.load = function(element,selectedTemplate) {
    		TrelloAccess.wrappers = $(element)
    		TrelloAccess.wrappers.each(function() {
    			var domElement = $(this)
	    		var listId = $(this).data('listid');
    			var template = $(this).data('template');
    			TrelloAccess.getCards(listId,template,domElement);
    		})

    	}

    	TrelloAccess.getData = function(url,successFunction,original,template,domElement,settings) {
			jQuery.ajax({
				url: url,
				setting: settings,
				dataType: 'json',
				type: 'get',
				success: function(data) {
					successFunction(data,template,domElement,original)
				},
				error: function(error) {
					console.log("error")
				}
			})
		}

    	TrelloAccess.getCards = function(listId,template,domElement) {

    		TrelloAccess.getData(apiUrl+'lists/'+listId+'/cards',TrelloAccess.parseCards,'',template,domElement)
    	}

    	TrelloAccess.getAttachments = function(card,template,domElement) {
    		TrelloAccess.getData(apiUrl+'cards/'+card.id+'/attachments/',TrelloAccess.parseAttachments,card,template,domElement)
    	}

		TrelloAccess.parseCards = function(cards,template,domElement) {
			var length = cards.length

			$(cards).each( function(index,data){
				var card = {};
				card.labels = []

				card.id = data.id
				card.url = data.url

				card.title = data.name
				card.desc = data.desc
				card.teaser = data.desc.split(/\n/)[0]
				//card.dueDate = $.format.date(this.due,'MM-dd-yy')

				$(this.labels).each( function() {
					card.labels.push(this.name) 	
				})

				if (data.badges.attachments > 0) {
					TrelloAccess.getAttachments(card,template,domElement)	
				} else {
					TrelloAccess.createDomElement(card,template,domElement)
				}				

			})

		}

		TrelloAccess.parseAttachments = function (data,template,domElement,card) {

			$(data).each( function() {
				if (this.name == 'agentur_logo.png') {
					card.logo = this.url
				}
			})

			TrelloAccess.createDomElement(card,template,domElement)

		}

		TrelloAccess.createDomElement = function(card,template,domElement) {
			var source = openTemplate
			var openTemplateCompiled = Handlebars.compile(openTemplate);
			var assignedTemplateCompiled = Handlebars.compile(assignedTemplate);


			var output
			if(template == 'open') {
				output = openTemplateCompiled(card)
			} else if(template == 'assigned') {
				output = assignedTemplateCompiled(card)
			} else {
				console.log("no template selected")
			}
			domElement.append(output)
			//return [opentemplateCompiled,assignedTemplateCompiled]

			//var html = template(card)
		}
		    	
        return TrelloAccess;
    }
    //define globally if it doesn't already exist
    if(typeof(TrelloAccess) === 'undefined'){
        window.TrelloAccess = define_trelloAccess();
    }
    else{
    }
})(window);