#!/bin/sh

# The script runs listener of @AI4AllBot telegram bot that replies on the given commands.

BASE_DIR="/home/ubuntu"
SCRIPT_DIR="$BASE_DIR/freepark_server/ai4all/telegram-bot"

. $BASE_DIR/.virtualenvs/freepark/bin/activate
python "$SCRIPT_DIR/ai4all_telegram_bot.py" > "$SCRIPT_DIR/log" 2>&1
