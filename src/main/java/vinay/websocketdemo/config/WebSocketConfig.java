package vinay.websocketdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import vinay.websocketdemo.handler.SampleWebsocketMessageHandler;

import java.util.LinkedList;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new SampleWebsocketMessageHandler(), "/user").setAllowedOrigins("http://localhost:3000");
    }
}
