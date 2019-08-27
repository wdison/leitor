(function(window) {
    window.wdi = window.wdi || {};
    var audio = wdi.audio = wdi.audio ||
    {
        pause: wdiPause,
        stop: wdiStop,
        resume: wdiResume,
        play: wdiPlay,
        configVoice: wdiConfigVoice,
        config: undefined
    }

    $progress_audio = $('#progress_audio');

    $progress_audio.bind('change', (event)=>{
        var progress_index = event.currentTarget.value||0;
        var text = audio.config.fullText;
        reInitPlayAudio(text, progress_index);
    });

    function reInitPlayAudio(text, progress_index) {
        var msgConfig = audio.config;
        audio.stop();
        setTimeout(()=>{
            audio.config = msgConfig;
            audio.configVoice();

            var previous_space = text.lastIndexOf( ' ', progress_index );
            audio.config.text = text.slice( previous_space );

            speechSynthesis.speak(audio.config);
            audio.config.paused = false;
        }, 800);
    }

    function wdiPause() {
        if(audio.config) {
            audio.config.paused = true;
        }
        return speechSynthesis.pause();
    }

    function wdiStop() {
        speechSynthesis.cancel();
        audio.config = undefined;
    }

    function wdiResume() {
        var progress_index = audio.config.progress_index||0;
        var text = audio.config.text;
        reInitPlayAudio(text, progress_index);
    }

    function wdiPlay() {
        if(speechSynthesis.speaking && audio.config) {
            if(audio.config.paused) {
                /*pretencao: 'audio.resume();'*/
                audio.resume();
            } else {
                console.log('áudio em andamento!');
            }
        }else{
            /*                    var text = $('#message').val();*/
            var text = $('#wdi_pdf_text').text();
            var msgConfig = new SpeechSynthesisUtterance(text);
            audio.config = msgConfig;

            audio.configVoice();

            msgConfig = audio.config;

            msgConfig.text = text;
            msgConfig.fullText = text;
            msgConfig.origTextLength = (text||"").length;

            $progress_audio.attr('max', msgConfig.origTextLength);
            $progress_audio.val(0);

            msgConfig.onend = function(e) {
                /*console.log('Finished in ' + event.elapsedTime + ' seconds.');*/
                $progress_audio.val(msgConfig.origTextLength);
                audio.config = undefined;
                audio.stop();
            };

            msgConfig.onboundary = function( e ) {
                if ( e.name == 'word' ) {
                    setTimeout(()=>{
                        if(audio.config){
                            audio.config.progress_index=e.charIndex;
                            audio.config.progress_total_index=e.charIndex + (audio.config.origTextLength - audio.config.text.length);
                            $progress_audio.val(audio.config.progress_total_index);
                        }
                    }, 50);
                }
            };

            speechSynthesis.speak(msgConfig);
        }
    }

    function wdiConfigVoice() {
        var msgConfig = audio.config;
        var voices = window.speechSynthesis.getVoices();
        msgConfig.voice = voices[$('#voices').val()];
        if(!msgConfig.voice) {
            voices.forEach(function(voice, index) {
                if(voice.default) {
                    msgConfig.voice = voice;
                }
            });
        }

        /*TODO implementar volume*/
        msgConfig.lang = msgConfig.voice.lang;
        msgConfig.voice.default = true;                

        var name = msgConfig.voice.name.toUpperCase();
        if(name.indexOf('GOOGLE')!=-1) {
            msgConfig.rate = $('#rate').val() / 50;
            msgConfig.pitch = $('#pitch').val() / 50;
        }else if(name.indexOf('MICROSOFT')!=-1) {
            msgConfig.rate = $('#rate').val() / 10;
            msgConfig.pitch = $('#pitch').val() / 50;
        } else {
            console.log('Rate and Pitch only work with native voice.');
            msgConfig.rate = -1;
            msgConfig.pitch = -1;
        }
    }

})(window||{});

$(function(){
    speechSynthesis.onvoiceschanged = function() {
        var $voicelist = $('#voices');

        if($voicelist.find('option').length == 0) {
            speechSynthesis.getVoices().forEach(function(voice, index) {
                var $option = $('<option>')
                .val(index)
                .html(voice.name + (voice.default ? ' (default)' :''));

                $voicelist.append($option);
            });

            $voicelist.material_select();
        }
    }
    $('#wdi_play').click(wdi.audio.play);
    $('#wdi_pause').click(wdi.audio.pause);
    $('#wdi_stop').click(wdi.audio.stop);
});