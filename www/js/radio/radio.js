angular.module('radio', [])
    .controller('radioCtrl', radioCtrl);
    
    radioCtrl.$inject = ['$scope', '$cordovaMedia', '$http']
    function radioCtrl($scope, $cordovaMedia, $http) {
        
        this.play = play;

        var src = 'https://streaming.radionomy.com/1-Otaku-Music-Radio';
        var PLAYING = false;
        var radio = null;
        $scope.control = "Play";
        
        // Obtiene el nombre y el artista cada 15 segundos
        getSong();
        setInterval(function() {
            getSong();
        }, 15000);
        
        function play() {
            if (!PLAYING) {
                if (radio == null) {
                    radio = new Media(src,
                        function () { 
                            // Success 
                        },
                        function (err) {
                            alert("Ocurrió un error al cargar. Comprueba tu conexión a Internet.");
                        }
                    );
                }
                radio.play();
                getSong();
                $scope.control = "Pause";
                PLAYING = true; 
            } else {
                radio.pause();
                $scope.control = "Play";
                PLAYING = false;
            }
        }
        
        function getSong() {
            $http.get("https://api.radionomy.com/currentsong.cfm?radiouid=7ed2f029-4646-4488-ab8a-a55834710520&type=json&callmeback=yes&cover=yes")
                .then(function(res) {
                    var str = res.data;
                    var json = str.replace("GetPlayInfo(", "");
                    var json = json.replace(")", "");
                    var formated_json = JSON.parse(JSON.stringify(eval("(" + json + ")")));
                    
                    //$scope.music_info = formated_json.tracks;
                    
                    $scope.song   = formated_json.tracks.title;
                    $scope.artist = formated_json.tracks.artists;
                    $scope.cover  = formated_json.tracks.cover;
                    
                })
                .catch(function(err) {
                    console.log("Error!");
                })  
        }
    }