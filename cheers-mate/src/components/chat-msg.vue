<template>
    <section class="msg-container">
        <div class="msg">
            <span class="msg-from"><slot name="from"></slot>: </span>
            <slot name="txt"></slot>
            <div class="msg-at"><slot name="at"></slot></div>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
            .msg-container {
                display: flex;
                margin: 0px 5px 10px 0px;
                justify-content: flex-start;

                .msg-at {
                    opacity: .6;
                    font-size: 0.6em;
                    text-align: right;
                }
                .msg-from {
                    font-weight: bold;
                    cursor: pointer;
                }
                .msg {
                    width: fit-content;
                    position: relative;
                    background: darken(#faf9f7,10%);
                    border-radius: .4em;
                    padding: 5px;
                }

                .msg:after {
                    position: absolute;
                    bottom: 0;
                    left: 80%;
                    width: 0;
                    height: 0;
                    border: 20px solid transparent;
                    border-top-color: darken(#faf9f7,10%);
                    border-bottom: 0;
                    border-left: 0;
                    margin-left: -10px;
                    margin-bottom: -20px;
                }

            }
            .msg-container.my-msg {
                justify-content: flex-end;
                .msg {
                    background: lighten(#e6a23c,10%);
                    // direction: rtl;
                    .msg-from {
                        display: none;
                    }
                        
                    &:after {
                        border-top-color: lighten(#e6a23c,10%);
                        border-right: 0;
                        left: 20%;
                    }
                }
            }
</style>
