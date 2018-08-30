<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Defines the editing form for the transcription question type.
 *
 * @package    qtype
 * @subpackage transcription
 * @copyright  2014 Grzegorz Aperliński
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();


/**
 * Transcription question editing form definition.
 *
 * @copyright  2014 Grzegorz Aperliński
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_transcription_edit_form extends question_edit_form {

    protected function definition_inner($mform) {
        $menu = array(
            get_string('caseno', 'qtype_transcription'),
            get_string('caseyes', 'qtype_transcription')
        );
        $mform->addElement('select', 'usecase',
                get_string('casesensitive', 'qtype_transcription'), $menu);

        $mform->addElement('static', 'answersinstruct',
                get_string('correctanswers', 'qtype_transcription'),
                get_string('filloutoneanswer', 'qtype_transcription'));
        $mform->closeHeaderBefore('answersinstruct');

        $this->add_per_answer_fields($mform, get_string('answerno', 'qtype_transcription', '{no}'),
                question_bank::fraction_options());

        $this->add_interactive_settings();
    }

    protected function data_preprocessing($question) {
        global $PAGE;

        $path = '/question/type/'.$this->question->qtype;

        $question = parent::data_preprocessing($question);
        $question = $this->data_preprocessing_answers($question);
        $question = $this->data_preprocessing_hints($question);

        $PAGE->requires->jquery();
        $PAGE->requires->js($path . '/js/IPAcontrols.js', true);
        $PAGE->requires->js($path . '/js/IPAcontrols_buttons.js', true);
        $PAGE->requires->css($path . '/css/IPA_buttons.css', true);

        return $question;
    }

    public function validation($data, $files) {
        $errors = parent::validation($data, $files);
        $answers = $data['answer'];
        $answercount = 0;
        $answererror = array();
        $maxgrade = false;

        foreach ($answers as $key => $answer) {
            $trimmedanswer = trim($answer);
            if ($trimmedanswer !== '') {
                $answercount++;
                if ($data['fraction'][$key] == 1) {
                    $maxgrade = true;
                }
            } else if ($data['fraction'][$key] != 0 ||
                    !html_is_blank($data['feedback'][$key]['text'])) {
                $maxgrade = true;
                //$errors["answer[$key]"] = get_string('answermustbegiven', 'qtype_transcription');
                $answererror[] = get_string('answermustbegiven', 'qtype_transcription');
                $answercount++;
            }
        }

        if ($answercount==0) {
            //$errors['answer[0]'] = get_string('notenoughanswers', 'qtype_transcription', 1);
            $answererror[] = get_string('notenoughanswers', 'qtype_transcription', 1);
        }
        if ($maxgrade == false) {
             $answererror[] = get_string('fractionsnomax', 'question');
            //$errors['answeroptions[0]'] = get_string('fractionsnomax', 'question');
        }

        if(!empty($answererror)){
            $errors['answeroptions[0]'] = implode('. ', $answererror);
        }

        return $errors;
    }

    public function qtype() {
        return 'transcription';
    }
}
/*echo '<script type="text/javascript" src="./type/transcription/js/jquery.js"></script>';
echo '<script type="text/javascript" src="./type/transcription/js/IPAcontrols.js"></script>';
echo '<script type="text/javascript" src="./type/transcription/js/IPAcontrols_buttons.js"></script>';
echo '<link href="./type/transcription/css/IPA_buttons.css" type="text/css" rel="stylesheet" />';*/