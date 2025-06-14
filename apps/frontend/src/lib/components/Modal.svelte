<script lang="ts">
    let { modal_title = null, modal_body = null, modal_button = null, onClose} = $props();
</script>

<div class="modal-backdrop">
    <div class="modal">
        <button class="close-button" onclick={onClose} aria-label="Close modal">×</button>

        {#if modal_title}
        <p class="modal-title">{modal_title}</p>
        {/if}

        {#if modal_body}
            {@render modal_body()}
        {/if}

        {#if modal_button}
            <div class="modal_button_container">
                {@render modal_button()}
            </div>
        {/if}
    </div>
</div>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 1rem;
    }

    .modal {
        background: white;
        border-radius: 8px;
        width: 100%;
        max-width: 500px;
        position: relative;
        padding: 1.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        animation: fadeIn 0.2s ease-out;
    }

    .close-button {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        line-height: 1;
    }

    .modal-title {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
    }

    .modal_button_container {
        display: flex;
        justify-content: center;
    }

    .modal-footer {
        display: flex;
        justify-content: center;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to   { opacity: 1; transform: scale(1); }
    }

    @media (max-width: 480px) {
        .modal {
        padding: 1rem;
        }

        .modal-title {
        font-size: 1rem;
        }

        .modal-body {
        font-size: 0.95rem;
        }
    }
</style>
