window.PluginView = View.extend({
	
	item: 'plugin-item-template',
	template: 'plugin-detail-template',
	formTemplate: _.template($("#plugin-form-template").html()),
	
	showContext: function (context) {
	  //Method used to show any configurable object in a plugin, anything other than "overview"
	  this.context = context;
	  var contexts = this.model.get("configurable_objects"), modelContext, output;
	  $.each(contexts, function (i, val){
	    if (contexts[i].name === context) {
	      modelContext = contexts[i];
	      return false; //equivalent to break;
	    }
	  });
	  if (typeof modelContext !== "undefined") {
	    output =  modelContext.helper_text || "";
	    if (modelContext["form"] !== "undefined") {
        output += this.formTemplate(modelContext["form"]);
  	  }
	  }
	  else {
	    output = "No valid context to display";
	  }
	  
	  var className = context;
    while (className.indexOf(' ') > -1) {
      className = className.replace(' ', '');
    }
	  
	  $(this.el).find(".substance").empty().html(output);
	  $(this.el).find("ul.plugin-nav > li.active").removeClass("active");
	  $(this.el).find("ul.plugin-nav > li." + className).addClass("active");
	}
	
});