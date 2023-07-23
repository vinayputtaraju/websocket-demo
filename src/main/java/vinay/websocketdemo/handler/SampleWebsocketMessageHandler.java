package vinay.websocketdemo.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@Slf4j
public class SampleWebsocketMessageHandler extends TextWebSocketHandler {
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        log.info("session : {}",session);
        log.info("message: {}",message.getPayload());
        Thread.sleep(500);
        session.sendMessage(new TextMessage("Received message : "+message.getPayload()));
    }
}
