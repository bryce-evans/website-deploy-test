/**
 * A set of utilities used across examples.
 * While helpful, they are not core to the webl-gl portals framework.
 */

const ShaderType = {
    VERTEX: "vertex",
    FRAGMENT: "fragment",
}

const StatsDisplay = {
    FPS: 0,
    MS: 1,
    MB: 2,
  }

  
class Utils {
    static genId() {
        Math.random().toString(36).substring(7);
    }
  
    /**
     * Fills in all x-shader scripts with their respective data-srcs.
     * This is helpful for keeping shaders in separate files and reusing them across html files.
     * @param {function()} callback : Function to call upon completion.
     */
    static loadShaders(callback) {
        var vertexShaders       = $('script[type="x-shader/x-vertex"]');
        var fragmentShaders     = $('script[type="x-shader/x-fragment"]');
        var shadersLoaderCount  = vertexShaders.length + fragmentShaders.length;
        
        var shadersHolder = { vertex: '', fragment: '' };
        
        function loadShader(shader, type) {
            var $shader = $(shader);
        
            $.ajax({
                url: $shader.data('src'),
                dataType: 'text',
                context: {
                    domElement: $shader,
                    name: $shader.data('name'),
                    type: type
                },
                complete: processShader
            });
        }
        
        function processShader( jqXHR, textStatus) {
            shadersLoaderCount--;
            shadersHolder[this.type] = jqXHR.responseText;
            this.domElement.html(jqXHR.responseText);

            if ( !shadersLoaderCount ) {
                shadersLoadComplete();
            }
        }
        
        function shadersLoadComplete() {
            callback();
        }
        
        if (vertexShaders.length === 0) {
            console.warn("Attempted to load shaders but no vertex shaders found.");
        }

        if (fragmentShaders.length === 0) {
            console.warn("Attempted to load shaders but no fragment shaders found.");
        }

        for (var i = 0; i < vertexShaders.length; i++){
            loadShader( vertexShaders[i], ShaderType.VERTEX );
        }
        for (var i = 0; i < fragmentShaders.length; i++){
            loadShader( fragmentShaders[i], ShaderType.FRAGMENT );
        }
    
    }

}

export { Utils, StatsDisplay }