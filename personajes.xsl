<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:x="http://tempuri.org/personajes" exclude-result-prefixes="x">

    <xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html></xsl:text>
        <html lang="es">
            <head>
                <meta name="author" content="UO251322" />
                <title>Personajes</title>
                <link rel="stylesheet" type="text/css" href="css/estilo.css" />
                <link rel="stylesheet" type="text/css" href="css/grid-2nav.css" />
            </head>

            <body>
                <header>
                    <h1>D &#38; D</h1>
                    <nav>
                        <ul>
                            <li>
                                <a title="Enlace a la pagina inicial" tabindex="1" accesskey="I" href="index.html">Inicio</a>
                            </li>
                            <li>
                                <a title="Enlace al tutorial" tabindex="2" accesskey="T" href="Tutorial.html">Tutorial</a>
                            </li>
                            <li>
                                <a title="Enlace a la biblioteca de personajes" tabindex="3" accesskey="B" href="Biblioteca.xml">Biblioteca</a>
                            </li>
                            <li>
                                <a title="Enlace al tablero" tabindex="4" accesskey="E" href="Tablero.html">Tablero</a>
                            </li>
                        </ul>
                    </nav>
                    <nav>
                        <ul>
                            <li>
                                <a title="Enlace al editor" tabindex="5" accesskey="d" href="Editor.html">Editor</a>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <h2>Personajes</h2>
                    <xsl:apply-templates />
                </main>
            </body>
        </html>
    </xsl:template>


    <xsl:template match="x:personaje">
        <section>
            <h3>
                <xsl:value-of select="@nombre" />
            </h3>
            <p>
                Raza:
                <xsl:value-of select="x:raza" />
            </p>
            <p>
                Descripcion:
                <xsl:value-of select="x:descripcion" />
            </p>
            <p>
                transfondo:
                <xsl:value-of select="x:transfondo" />
            </p>
            <p>
                alinemiento:
                <xsl:value-of select="x:alinemiento" />
            </p>
            <p>
                imagen:
                <xsl:value-of select="x:imagen" />
            </p>

            <p>
                Vida:
                <xsl:value-of select="x:vida" />
            </p>
            <p>
                Movimiento
                <xsl:value-of select="x:movimiento" />
            </p>

            <p>
                Nivel:
                <xsl:value-of select="x:nivel" />
            </p>
            <p>
                Clase:
                <xsl:value-of select="x:clase" />
            </p>
            <p>
                Experiencia:
                <xsl:value-of select="x:experiencia" />
            </p>

            <section>
                <h4>Atributos</h4>
                <p>
                    Fuerza:
                    <xsl:value-of select="x:atributos/x:fuerza" />
                </p>
                <p>
                    destreza:
                    <xsl:value-of select="x:atributos/x:destreza" />
                </p>
                <p>
                    constitucion:
                    <xsl:value-of select="x:atributos/x:constitucion" />
                </p>
                <p>
                    inteligencia:
                    <xsl:value-of select="x:atributos/x:inteligencia" />
                </p>
                <p>
                    sabiduria:
                    <xsl:value-of select="x:atributos/x:sabiduria" />
                </p>
                <p>
                    carisma:
                    <xsl:value-of select="x:atributos/x:carisma" />
                </p>
            </section>

            <section>
                <h4>Competencias</h4>
                <p>
                    bonificador:
                    <xsl:value-of select="x:competencias/x:bonificador" />
                </p>
                <xsl:for-each select="x:competencias/x:salvaciones/x:atributo">
                    <p>
                        atributo:
                        <xsl:value-of select="." />
                    </p>
                </xsl:for-each>
                <xsl:for-each select="x:competencias/x:idiomas/x:idioma">
                    <p>
                        idioma:
                        <xsl:value-of select="." />
                    </p>
                </xsl:for-each>
            </section>

            <section>
                <h4>Inventario</h4>
                <xsl:for-each select="x:inventario/x:objeto">
                    <dt>
                        <xsl:value-of select="@nombre" />
                    </dt>
                    <dd>
                        descripcion:
                        <xsl:value-of select="x:descripcion" />
                    </dd>
                </xsl:for-each>
            </section>

            <section>
                <h4>Magias</h4>
                <p>
                    atributo:
                    <xsl:value-of select="x:magias/x:atributo" />
                </p>
                <p>
                    salvacion:
                    <xsl:value-of select="x:magias/x:salvacion" />
                </p>
                <p>
                    bonificador:
                    <xsl:value-of select="x:magias/x:bonificador" />
                </p>
                <xsl:for-each select="x:magias/x:nivelMagia">
                    <p>
                        Nivel
                        <xsl:value-of select="@n" />
                    </p>
                    <p>
                        usos:
                        <xsl:value-of select="x:usos" />
                    </p>
                    <xsl:for-each select="x:magia">
                        <p>
                            <xsl:value-of select="@nombre" />
                        </p>
                        <p>
                            descripcion:
                            <xsl:value-of select="x:descripcion" />
                        </p>
                        <p>
                            componentes:
                            <xsl:value-of select="x:componentes" />
                        </p>
                        <xsl:for-each select="x:referencias/x:referencia">
                            <p>
                                referencia:
                                <xsl:value-of select="." />
                            </p>
                        </xsl:for-each>
                    </xsl:for-each>
                </xsl:for-each>
            </section>

            <footer>
                <xsl:for-each select="x:referencias/x:referencia">
                    <p>
                        referencia:
                        <xsl:value-of select="." />
                    </p>
                </xsl:for-each>

                <xsl:for-each select="x:autor">
                    <p>
                        autor:
                        <xsl:value-of select="." />
                    </p>
                </xsl:for-each>

            </footer>
        </section>
    </xsl:template>

</xsl:stylesheet>