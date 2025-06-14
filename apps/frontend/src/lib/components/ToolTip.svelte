<script>
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    let { children, content } = $props();
</script>

<Tooltip.Provider>
    <Tooltip.Root>
        <Tooltip.Trigger>
            {@render children()}
        </Tooltip.Trigger>
        <Tooltip.Content>
        <p>{content}</p>
        </Tooltip.Content>
    </Tooltip.Root>
</Tooltip.Provider>

