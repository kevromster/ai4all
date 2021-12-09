from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
from telegram.inline.inlinekeyboardmarkup import InlineKeyboardMarkup
from telegram.inline.inlinekeyboardbutton import InlineKeyboardButton

import logging
logging.basicConfig(format='[%(asctime)s] %(name)s %(levelname)s: %(message)s', level=logging.INFO)
LOGGER = logging.getLogger('AI4AllBot')

TGBOT_TOKEN = "615963778:AAEJGRsv675frXPhVdCgIHOhuDX-h8vXEUQ"
AI4ALL_SERVER_NAME = "ai4all.ru";


def onStartCommand(bot, update):
    add_url="http://{0}/add/{1}/".format(AI4ALL_SERVER_NAME, update.message.chat.id)
    settings_url="http://{0}/cameras/{1}/".format(AI4ALL_SERVER_NAME, update.message.chat.id)

    add_button = InlineKeyboardButton(text='Добавить камеру', url=add_url)
    settings_button = InlineKeyboardButton(text = 'Управление камерами', url=settings_url)

    markup = InlineKeyboardMarkup([[add_button, settings_button]])
    text = "Добро пожаловать в сервис *AI for All*. Используйте кнопки ниже для управления настройками ваших камер.";

    update.message.reply_markdown(text=text, reply_markup=markup)


def onHelpCommand(bot, update):
    text = "Введите команду /start для появления меню управления вашими интернет-камерами.\n\n" \
           "Используйте кнопку \"*Добавить камеру*\" для добавления новой камеры в сервис и \"*Управление камерами*\"" \
           " для удаления либо изменения настроек нужной камеры.\n\n" \
           "Вопросы, замечания, предложения по работе сервиса пишите в группу @ai4all\\_feedback."
    update.message.reply_markdown(text=text)


def onAnyTextMessage(bot, update):
    LOGGER.info('got input message from chatId %d, username \'%s\': "%s"',
                update.message.chat.id, update.message.from_user.username, update.message.text)


def runBot():
    LOGGER.info('Starting AI4All bot...')
    updater = Updater(token=TGBOT_TOKEN)
    dispatcher = updater.dispatcher

    start_command_handler = CommandHandler('start', onStartCommand)
    help_command_handler = CommandHandler('help', onHelpCommand)
    text_message_handler = MessageHandler(Filters.text, onAnyTextMessage)

    dispatcher.add_handler(start_command_handler)
    dispatcher.add_handler(help_command_handler)
    dispatcher.add_handler(text_message_handler)

    LOGGER.info('long poll started')
    updater.start_polling(clean=True)

    # stop bot if Ctrl+C pressed
    updater.idle()


if __name__ == '__main__':
    runBot()
