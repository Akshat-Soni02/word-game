<script lang="ts">
    import { socket } from '$lib/stores/socket';

    $effect(() => {
		if ($socket) {
            console.log('Socket is ready:', $socket);
            $socket.on('message', (data) => {
                const message = JSON.parse(data);
                console.log('socket data' + message);
            });
            // you can now use $socket.emit(...) or $socket.on(...)
        }
	});
</script>
  
<h1>Socket Demo</h1>
<p>{$socket?.id}</p>
<p>Socket status: {$socket ? 'Connected' : 'Disconnected'}</p>
  