<?php

defined('_JEXEC') or die;

$app             = JFactory::getApplication();
$doc             = JFactory::getDocument();
$user            = JFactory::getUser();
$this->language  = $doc->language;
$this->direction = $doc->direction;

// Getting params from template
$params = $app->getTemplate(true)->params;

// Detecting Active Variables
$option   = $app->input->getCmd('option', '');
$view     = $app->input->getCmd('view', '');
$layout   = $app->input->getCmd('layout', '');
$task     = $app->input->getCmd('task', '');
$itemid   = $app->input->getCmd('Itemid', '');
$sitename = $app->get('sitename');

// Output as HTML5
$doc->setHtml5(true);

?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<!-- Bootstrap -->
    <!-- build:css css/main.css -->
	<link href = "/templates/tmmmikpiua/css/bootstrap.css" rel = "stylesheet">
	<link href = "/templates/tmmmikpiua/css/font-awesome.css" rel = "stylesheet">
	<link href = "/templates/tmmmikpiua/css/tmmmi.css" rel = "stylesheet">
	
	
	<!-- endbuild -->
	<jdoc:include type="head" />

	<!--[if lt IE 9]>
		<script src="<?php echo JUri::root(true); ?>/media/jui/js/html5.js"></script>
	<![endif]-->
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
	<!-- Body -->
	<div id="page-top" class="index">
<!-- Navigation -->
    <nav id="mainNav" class="navbar navbar-default navbar-custom navbar-fixed-top">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span><i class="fa fa-bars" aria-hidden="true"></i>
                </button>
                <a class="navbar-brand page-scroll" href="#page-top">TM MMI </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="hidden">
                        <a href="#page-top"></a>
                    </li>
                   <jdoc:include type="modules" name="topmenu" />
                </ul>
            </div>
                <div class="row">
                    <div class="col-xs-12 col-md-6"> <jdoc:include type="modules" name="lang" style="xhtml" />  </div>
                    <div class="col-xs-12 hidden-xs col-md-6 text-right"> <jdoc:include type="modules" name="search" style="xhtml" />   </div>
                </div>


            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>

    <!-- Header -->
    <header>
        <div class="container">
            <div class="intro-text">
                <div class="intro-heading ">
                    
                    Кафедра технологій машинобудування
                </div>
                <div class="intro-lead-in">Механіко-машинобудівний інститут</div>
                <div class="intro-lead-in">НТУУ КПІ ім. І. Сікорського</div>
                <div class="intro-lead-in"><a href="https://vk.com/tm_mmi_kpi" class="page-scroll"target="_blank"><span class="fa-stack fa-1x"><i class="fa fa-circle fa-stack-2x"></i>
                    <i class="fa fa-vk fa-stack-1x fa-inverse" aria-hidden="true"></i></span></a></div>
            </div>
        </div>
    </header>

    <div class="container contents">
        <div class="row">
            <?php if($this->countModules('left')) : ?>
            	<div class="hidden-xs col-sm-3">
              		<jdoc:include type="modules" name="left" style="xhtml" />
              	</div>
                <div class="col-xs-12 col-sm-9">
                    <div id="article<?php echo $contentwidth; ?>">
                        <jdoc:include type="message" /> 
                        <jdoc:include type="component" style="xhtml" />
                    </div>
                </div>
            <?php  else : ?>
                <div class="col-xs-12">
                    <div id="article<?php echo $contentwidth; ?>">
                        <jdoc:include type="message" /> 
                        <jdoc:include type="component" style="xhtml" />
                    </div>
                </div>
    	    <?php endif; ?>
            
        </div>
    </div>

    <footer>
        <div class="container">
            <div class="row">
                <?php if($this->countModules('footer')) : ?>
                <div class="col-xs-12 copyright">
                    <jdoc:include type="modules" name="footer" style="xhtml" />
                </div>
                <?php endif; ?>
            </div>
        </div>
    </footer>







	<jdoc:include type="modules" name="debug" style="none" />
	<!-- build:js js/main.js -->
	<!--
	<script src="js/jquery.js"></script>
    <script src="js/bootstrap.js"></script>
	 -->
	<script src="/templates/tmmmikpiua/js/jquery.js"></script>
    <script src="/templates/tmmmikpiua/js/bootstrap.js"></script>
	<!-- Theme JavaScript -->
    <script src="/templates/tmmmikpiua/js/tmmmi.js"></script>
	<!-- endbuild -->
	
</body>
</html>
