function isotopeUp() {
	startIsotope()
	console.log("isotope")
}

jQuery(document).ready( function() {

	TrelloAccess.load('.grid')
	TrelloAccess.load('.inProgress')
	setTimeout(isotopeUp,1500)
})